import { getCarRepository } from "@/lib/db";
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const json = await req.json();

    if (!json) {
        return {
            status: 400,
            body: {
                message: "No request body found"
            }
        }
    }
    const carRepository = await getCarRepository();

    // ensure that the var does not already exist by checking the name field 
    const carExists = await carRepository.search().where("date").equals(json.date).return.count();
    if (carExists > 0) {
        return NextResponse.json({
            status: 400,
            body: {
                message: "Car already exists"
            }
        });
    } else {
        const car = await carRepository.save(json);
        return NextResponse.json({
            status: 200,
            body: {
                message: "Car created",
                car
            }
        })
    }
}