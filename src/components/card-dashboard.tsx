import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { LucideProps } from 'lucide-react';
import { DateRange } from "react-day-picker";

interface CardDashboardProps {
    title: string;
    content: string;
    footer: string;
    Icon: ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;
    date?: DateRange;
}

export default function CardDashboard({title, content, footer, Icon, date} : CardDashboardProps) {
    return (
        <Card className="w-full md:w-[350px]">
            <CardHeader className="flex flex-row justify-between">
                <CardTitle className="text-1xl w-fit">{`${title}`}</CardTitle>
                <Icon className="w-6 h-6" />
            </CardHeader>
            <CardContent className="text-3xl -mb-5">
                {content}
            </CardContent>
            <CardFooter className="flex justify-between text-gray-500">
                {footer}
            </CardFooter>
        </Card>
    )
}