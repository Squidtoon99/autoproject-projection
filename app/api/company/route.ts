import { getCompanyRepository } from "@/lib/db";
import { NextResponse, type NextRequest } from 'next/server';


export async function POST(req: NextRequest) {
    const json = await req.json();

    if (!json) {
        return NextResponse.json({
            status: 400,
            body: {
                message: "Invalid input"
            }
        });
    }

    const companyRepository = await getCompanyRepository();

    // ensure that the var does not already exist by checking the name field 
    const companyExists = await companyRepository.search().where('name').equals(json.name).return.count()

    if (companyExists > 0) {
        return NextResponse.json({
            status: 400,
            body: {
                message: "Company already exists"
            }
        });
    } else {
        // {name: Ford, ...values} => Ford: {...values}
        // id: json.name, object: json
        await companyRepository.save(json.name, json);
        return NextResponse.json({
            status: 201,
            body: {
                message: "Company created successfully"
            }
        });
    }
}