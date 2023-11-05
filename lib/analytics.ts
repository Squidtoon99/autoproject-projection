import createRedis from "./client";
import { getCarRepository, getCompanyRepository } from "./db";

export const getModelUsage = async (company: string) => {
    const carRepository = await getCarRepository();
    const datapoints = await carRepository.search().where('make').equals(company).return.all();
    
    const modelUsage = datapoints.reduce((acc, curr) => {
        if (acc[curr.model]) {
            acc[curr.model] += 1;
        } else {
            acc[curr.model] = 1;
        }
        return acc;
    }, {});
    
    // limit to top 4 results 
    const sorted = Object.keys(modelUsage).sort((a, b) => modelUsage[b] - modelUsage[a]).slice(0, 4);
    // format x: <model>, y: <usage>;
    const formatted = sorted.map((key) => {
        return {
            x: key,
            y: modelUsage[key]
        }
    }
        
    );

    return formatted;
};

export const getModelLineage = async (company: string) => {
    /*
    FT.AGGREGATE car:index "@make:{Tesla}"

    LOAD 1 date
    APPLY "floor((@date / 1000) - ((@date / 1000) % 3600))" AS hour

    GROUPBY 2 @hour @model
    
        REDUCE count 0 AS num_models
        
    SORTBY 1 @hour
    */
    
    const carRepository = await getCarRepository();
    const datapoints = await carRepository.search().where('make').equals(company).return.all();

    // Generate 8 even spread aggregations over the timestamp
    const timestamps = datapoints.map((datapoint) => datapoint.date);
    const min = Math.min(...timestamps);
    const max = Math.max(...timestamps);
    const range = max - min;
    const step = range / 8;
    const aggregations = [];
    for (let i = 0; i < 8; i++) {
        aggregations.push(min + (step * i));
    }

    const aggregationPromises = aggregations.map(async (aggregation) => {
        const aggregationTimestamp = Math.floor((aggregation / 1000) - ((aggregation / 1000) % 3600));
        const dp = datapoints.filter((datapoint) => {
            return datapoint.date >= aggregation && datapoint.date < (aggregation + step);
        });
        const modelUsage = dp.reduce((acc, curr) => {
            if (acc[curr.model]) {
                acc[curr.model] += 1;
            } else {
                acc[curr.model] = 1;
            }
            return acc;
        }, {});
        return {
            x: aggregationTimestamp,
            y: modelUsage
        };
    });

    const aggregationsData = await Promise.all(aggregationPromises);
    const formatted = aggregationsData.map((aggregation) => {
        return {
            ts: aggregation.x,
            ...aggregation.y
        };
    });

    return formatted;
};

export const getPreviousRevenue = async (company: string) => {
    const companyRepository = await getCompanyRepository();
    const companyData = await companyRepository.search().where('name').equals(company).return.all();
    const ticker = companyData[0].ticker;

    const redis = await createRedis();
    const previousRevenue = await redis.get(`revenue:${ticker}`);
    return previousRevenue;
}

export const getRevenuePrediction = async (company: string) => {
    // calculate the stdev of the datapoints and see if there is a significant deviation from the mean % of cars from this company
    const carRepository = await getCarRepository();
    const datapoints = await carRepository.search().where('make').equals(company).return.all();
    // Aggregate the % of total cars is from this company 
    const totalCars = await carRepository.search().return.count();
    const companyCars = await carRepository.search().where('make').equals(company).return.count();
    
    // get a list of <time>: <percentage> of cars from this company
    const timestamps = datapoints.map((datapoint) => datapoint.date);
    const min = Math.min(...timestamps);
    const max = Math.max(...timestamps);
    const range = max - min;
    const step = range / 8;
    const aggregations = [];
    for (let i = 0; i < 8; i++) {
        aggregations.push(min + (step * i));
    }

    const aggregationPromises = aggregations.map(async (aggregation) => {
        const aggregationTimestamp = Math.floor((aggregation / 1000) - ((aggregation / 1000) % 3600));
        const dp = datapoints.filter((datapoint) => {
            return datapoint.date >= aggregation && datapoint.date < (aggregation + step);
        });
        const companyCars = dp.length;
        const percentage = companyCars / totalCars;
        return {
            x: aggregationTimestamp,
            y: percentage
        };
    });


    const aggregationsData = await Promise.all(aggregationPromises);

    // calculate the stdev of the datapoints and see if there is a significant deviation from the mean % of cars from this company
    const percentages = aggregationsData.map((aggregation) => aggregation.y);
    const mean = percentages.reduce((acc, curr) => acc + curr, 0) / percentages.length;
    const stdev = Math.sqrt(percentages.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / percentages.length);
    const lastPercentage = percentages[percentages.length - 1];
    const deviation = Math.abs(lastPercentage - mean) / stdev;
    

    return NextReseponse.json({ data: 30_000_000 });
    
};