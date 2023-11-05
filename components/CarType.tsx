import { Button } from "@/components/ui/button";
import Image from 'next/image';
import sedan from "@/public/svg/sedan.svg";
import suv from "@/public/svg/suv.svg";
import truck from "@/public/svg/pickup-truck.svg";


const CarType = () => {
    return <div className="flex flex-col">
        <h2 className="text-xl font-semibold mb-2">Car Type</h2>
        <div className="flex flex-col items-center space-y-2">
        {[sedan, suv, truck].map((image, index) => (
          <Button key={index} variant="secondary" className="w-8 h-8 rounded-full relative overflow-hidden mb-2">
            <Image src={image} alt={`Filter ${index + 1}`} layout="fill" objectFit="cover" className="rounded-full px-0.5 py-1" />
          </Button>
        ))}
      </div>
    </div>
    
};

export default CarType;