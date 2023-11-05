"use client";
import { useState } from 'react';
import Image from 'next/image';
import location from "@/public/svg/location.svg";
import time from "@/public/svg/time.svg";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// An array of US state abbreviations for validation
const usStates = [
    "AL", "ALABAMA", "AK", "ALASKA", "AZ", "ARIZONA", "AR", "ARKANSAS", 
    "CA", "CALIFORNIA", "CO", "COLORADO", "CT", "CONNECTICUT", "DE", "DELAWARE", 
    "FL", "FLORIDA", "GA", "GEORGIA", "HI", "HAWAII", "ID", "IDAHO", "IL", "ILLINOIS", 
    "IN", "INDIANA", "IA", "IOWA", "KS", "KANSAS", "KY", "KENTUCKY", "LA", "LOUISIANA", 
    "ME", "MAINE", "MD", "MARYLAND", "MA", "MASSACHUSETTS", "MI", "MICHIGAN", 
    "MN", "MINNESOTA", "MS", "MISSISSIPPI", "MO", "MISSOURI", "MT", "MONTANA", 
    "NE", "NEBRASKA", "NV", "NEVADA", "NH", "NEW HAMPSHIRE", "NJ", "NEW JERSEY", 
    "NM", "NEW MEXICO", "NY", "NEW YORK", "NC", "NORTH CAROLINA", "ND", "NORTH DAKOTA", 
    "OH", "OHIO", "OK", "OKLAHOMA", "OR", "OREGON", "PA", "PENNSYLVANIA", 
    "RI", "RHODE ISLAND", "SC", "SOUTH CAROLINA", "SD", "SOUTH DAKOTA", 
    "TN", "TENNESSEE", "TX", "TEXAS", "UT", "UTAH", "VT", "VERMONT", 
    "VA", "VIRGINIA", "WA", "WASHINGTON", "WV", "WEST VIRGINIA", "WI", "WISCONSIN", 
    "WY", "WYOMING"];

const Filters = () => {
    const [openPopover, setOpenPopover] = useState(null);
    const [filterValues, setFilterValues] = useState({ location: '', time: '', vehicle: '' });
    const [errors, setErrors] = useState({});

    // Function to handle opening a popover
    const handleOpenPopover = (index) => {
        setOpenPopover(openPopover === index ? null : index);
    };

  // Function to handle input changes
    const handleInputChange = (filter, value) => {
        setFilterValues(prevValues => ({
            ...prevValues,
            [filter]: value
        }));

    // Perform validation with every change to the input
        handleInputValidation(filter, value);
    };

  // Function to handle validation of inputs
    const handleInputValidation = (filter, value) => {
        let errorMessage = '';
        let stateNumber = -1;
        switch(filter) {
            case 'location':
                stateNumber = usStates.findIndex(state => state === value);
                if(stateNumber === -1)
                    errorMessage = 'Please enter a valid US state/abbreviation.';
                else
                    stateNumber = stateNumber / 2;
                break;
            case 'time':
                const timeRegex = /^(1[0-2]|0?[1-9]):[0-5][0-9](\s)?(AM|PM|am|pm)?$/;
                if (!timeRegex.test(value.trim()))
                    errorMessage = 'Please enter a valid time in HH:MM or H:MM format.';
                break;
            default:
                break;
    }
    
    setErrors(prevErrors => ({
        ...prevErrors,
        [filter]: errorMessage
    }));

    // stateNumber HOLD THE NUMBER STATE THAT THE USER ENTERED

    return !errorMessage;
  };

    const filterButtons = [
        { name: 'location', image: location},
        { name: 'time', image: time }
    ];

    return (
        <div className="flex flex-col items-center space-y-2">
            <span className="text-xl mb-2">Filters</span>
            {filterButtons.map((filter, index) => (
            <Popover key={index} open={openPopover === index}>
                <PopoverTrigger as="button" className="w-8 h-8 rounded-full relative overflow-hidden mb-2" onClick={() => handleOpenPopover(index)}>
                    <Image src={filter.image} alt={`${filter.name} filter`} layout="fill" objectFit="cover" className="rounded-full p-1" />
                </PopoverTrigger>
                <PopoverContent 
                    className="absolute right-0 mr-5 z-10 bg-white p-4 rounded-md shadow-lg"
                    open={openPopover === index}
                    onOpenChange={() => setOpenPopover(null)}
                >
                    <div className="flex flex-col">
                        <input
                            type="text"
                            value={filterValues[filter.name]}
                            onChange={(e) => {
                                handleInputChange(filter.name, e.target.value)
                            }}
                            placeholder={`Enter ${filter.name}`}
                            className="border-2 border-gray-200 rounded p-2"
                            />
                        {errors[filter.name] && <p className="text-red-500 text-xs mt-1">{errors[filter.name]}</p>}
                    </div>
                </PopoverContent>
            </Popover>
            ))}
        </div>
    );
};

export default Filters;
