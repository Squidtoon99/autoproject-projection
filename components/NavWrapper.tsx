"use server"

import { getCompanies } from "@/lib/db";
import Nav from "@/components/Nav";

const NavWrapper = async () => {
    const companies = await getCompanies();

    return <>
        <Nav companies={companies.map(c => c.name)}/>
    </>;
}

export default NavWrapper;