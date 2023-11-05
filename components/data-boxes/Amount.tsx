"use client";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis , Tooltip, YAxis} from 'recharts';
import useSWR from "swr";

const Amount = ({ model }: { model: string; }) => {
    const { data, isLoading, error } = useSWR("/api/company/model-usage?" + new URLSearchParams({ model}), (url) => fetch(url).then(r => r.json()));
    
    return (
        <Card className="bg-background/50 backdrop-blur-xl shadow-xl">
            <CardHeader>
                <CardTitle>Highest Selling Models</CardTitle>
            </CardHeader>
            <CardContent className="w-1/2">
                {!(isLoading || error) ? <BarChart width={250} height={150} data={data?.data}>
                        <Bar dataKey="y" fill="#8884d8" />
                        <Tooltip />
                        <XAxis dataKey="x"/>
                        <YAxis />
                    </BarChart>
                : <Skeleton className="h-32 w-48" />}
            </CardContent>
        </Card>
    );
};

export default Amount;