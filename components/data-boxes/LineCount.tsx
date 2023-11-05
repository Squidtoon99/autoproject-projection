"use client";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, XAxis, Tooltip, YAxis, Line } from 'recharts';
import useSWR from "swr";
import * as dateFns from 'date-fns'


const LineCount = ({ model }: { model: string; }) => {
    const { data, isLoading, error } = useSWR("/api/company/model-line?" + new URLSearchParams({ model }), (url) => fetch(url).then(r => r.json()));
    
    const dataKeys = Object.keys(data?.data[0] || {}).filter((key) => key !== "ts").slice(0, 4);

    const fmtXDate = (payload) => {
        // the x value is the current unix time in ms, turn it into MM/DD HH
        
        const date = new Date(payload);
        console.log(dateFns.format(date, 'dd hh'));
        return dateFns.format(date, 'hh a')
    }

    const getStroke = (i) => {
        const strokes = ["#ec4899", "#8b5cf6", "#8884d8", "#86198f"];
        return strokes[strokes.length % i];
    }
    return (
        <Card className="bg-background/50 backdrop-blur-xl shadow-xl">
            <CardHeader>
                <CardTitle>Model History</CardTitle>
            </CardHeader>
            <CardContent className="w-1/2">
                {!(isLoading || error) ?  <LineChart width={500} height={300} data={data?.data}>
                        <XAxis dataKey="ts" tickFormatter={fmtXDate} />
                        <YAxis />
                    <Tooltip />
                    {dataKeys.map((key, i) => <Line type="monotone" dataKey={key} stroke={getStroke(i)} />)}
                    </LineChart>
                    : <Skeleton className="h-32 w-48" />}
            </CardContent>
        </Card>
    );
};

export default LineCount;