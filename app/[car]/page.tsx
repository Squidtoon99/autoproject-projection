import Company from "@/components/Company"
import { getCompany, getCompanies } from "@/lib/db";

const CompanyPage = async (
    { params }: { params: { car: string; }; }
) => {
    const data = await getCompany(params.car);
    return <Company data={data}/>
};

export async function generateStaticParams() {
    const companies = await getCompanies();

    return companies.map((company) => ({
        car: company.name,
    }));
}

export default CompanyPage;