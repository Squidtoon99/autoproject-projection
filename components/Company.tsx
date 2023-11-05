import CarType from "@/components/CarType"
import Filters from "@/components/Filters";
import BottomNav from "@/components/BottomNav";
import Amount from "./data-boxes/Amount";
import LineCount from "./data-boxes/LineCount";

const Company = ({ data }: { data: any; }) => {
    const id = data?.name?.toLowerCase().split(" ").join("-");
    return <div id={id} className="nav-header relative flex w-screen mt-16 flex-col flex-wrap items-center justify-center px-8 space-y-4 pt-16 overflow-x-hidden">
        <div className="flex flex-row flex-wrap w-full justify-between">
            <CarType  />
            <img src={data.car_image} alt={`${data.name} logo`} className="car-image -z-10 w-2/3 opacity-80" />
            <Filters />
            <div className="absolute right-32 top-10 z-10 text-3xl bg-background/50 backdrop-blur-xl p-2 ">
                <div className="text-base">Estimated Revenue:</div> 3.5 Billion
                <br/>
                <div className="text-md text-emerald-500">+ 2%</div>
            </div>
        </div>
        <BottomNav />
        <div className="flex flex-row gap-x-4 justify-center">
            <Amount model={data?.name} />
            <LineCount model={data?.name}/>
        </div>
    </div>
};

export default Company;