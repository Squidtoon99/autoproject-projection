import { Schema } from 'redis-om'

const companyScheme = new Schema('company', {
    name: {type: "string", sortable: true},
    car_image: { type: "string" },
    ticker: { type: "string" },
    description: { type: "string" }
});

const carScheme = new Schema('car', {
    make: { type: "string" },
    model: { type: "string" },
    location: { type: "point" },
    date: { type: "date" },
});

export { companyScheme, carScheme }; 