"use client"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AnimatedLink from "@/components/AnimatedLink";
import { cn } from "@/lib/utils";

const Nav = ({companies}: {companies: string[]}) => {
    const [currentCompany, setCurrentCompany] = useState("");
    const pathname = usePathname();
    useEffect(() => {
        setCurrentCompany(pathname.split("/")[1]);
    }, [pathname]);

    
    const btnClass = "hover:bg-foreground/90 hover:text-background transition-all duration-300 ease-in-out";
    return <nav className="fixed flex z-30 px-4 pt-4 pb-2 justify-center w-full space-x-4 bg-background/50 backdrop-blur">
            {companies.map(company => {
                return <AnimatedLink href={`/${company}`} key={company}><Button variant={"ghost"} className={cn(btnClass, company == currentCompany ? "bg-foreground text-background" : "")} key={company}>{company.split("-").map(string => string.charAt(0).toUpperCase() + string.slice(1)).join(" ")}</Button></AnimatedLink>
            })}
    </nav>
}; // no questions

export default Nav;

