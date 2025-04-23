import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CustomIcon from './CustomIcon';
import { LucideIcon, User } from 'lucide-react';

interface CustomCardProps {
    image?: string;
    title: string;
    content?: string;
    alt?: string;
    onClick?: () => void;
    description?: string;
    statistics?: string;
    increasePercentage?: string;
    decreasePercentage?: string;
    icon?: React.ReactNode;
    className?: string;
    Imagesize?: string;
}

export const DocumentCustomCard = ({ image, title, content, alt, onClick, description, className, Imagesize }: CustomCardProps) => {
    return (
        <>
            <button
                className={`relative h-68 w-90 cursor-pointer duration-300 ease-in-out hover:-translate-y-2 hover:scale-104 hover:shadow-lg ${className}`}
                onClick={onClick}
                type='button'
                aria-label={title}
            >
                <CustomIcon imgSrc={image} alt={alt} sizes={Imagesize} className="h-full w-full rounded-md border border-gray-300 object-cover" />
                <Card className="absolute bottom-0 gap-2 rounded-b-md border border-gray-300 py-3 w-full">
                    <CardHeader className="px-4">
                        <CardTitle className="text-s3 text-center text-xl font-semibold">{title}</CardTitle>
                        <CardDescription className='text-justify text-md font-semibold text-black'>{description}</CardDescription>
                    </CardHeader>
                    <CardContent className='px-4 text-justify text-[13px] font-semibold text-black '>{content}</CardContent>
                </Card >
            </button >
        </>
    );
};

export const CustomDisplayCard = ({ title, description, statistics, increasePercentage, decreasePercentage, icon }: CustomCardProps) => {
    return (
        <div className="*:data-[slot=card]:border *:data-[slot=card]:rounded-md *:data-[slot=card]:shadow-sm *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
            <Card className="@container/card">
                <CardHeader className='flex flex-row justify-between items-center'>
                    <div className='flex flex-col gap-3'>
                        <CardDescription>{description}</CardDescription>
                        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                            {title}
                        </CardTitle>
                    </div>
                    <div>
                        {icon}
                    </div>
                </CardHeader>
                <CardFooter className="flex items-start gap-1 text-sm">
                    <span>
                        {increasePercentage && <span className="text-teal-500">{increasePercentage}</span>}
                        {decreasePercentage && <span className="text-red-500">{decreasePercentage}</span>}
                    </span>
                    <div className="text-muted-foreground">
                        {statistics}
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}


export const AdminCustomCard = ({ image, title, content, alt, onClick, description, Imagesize }: CustomCardProps) => {
    return (
        <>
            <button
                className="h-68 w-90 cursor-pointer duration-300 ease-in-out hover:-translate-y-2 hover:scale-104 hover:shadow-lg"
                onClick={onClick}
                type='button'
                aria-label={title}
            >
                <CustomIcon imgSrc={image} alt={alt} className="h-full w-full rounded-t-md border border-gray-300 object-contain " />
                <Card className="gap-2 rounded-b-md border border-gray-300 w-full pt-4">
                    <CardHeader>
                        <CardTitle className="text-s3 text-center text-lg font-semibold">{title}</CardTitle>
                        <CardDescription className="text-center text-md font-semibold text-black">{description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center text-xs font-semibold text-black" >{content}</CardContent>
                </Card>
            </button>
        </>
    );
};



