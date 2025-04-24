import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatText(text: string): string {
    return text
        .replace(/_/g, ' ') // Replace underscores with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
}

export const createStringSetter = <T extends Record<string, any>>(setData: (key: keyof T, value: string | number) => void) => {
    return (key: keyof T) => (value: string | Date | number | null | File) => {
        if (typeof value === 'string' || typeof value === 'number') {
            setData(key, value);
            console.log(value);
        }
    };
};

export const createDateSetter = <T extends Record<string, any>>(setData: (key: keyof T, value: string) => void) => {
    return (key: keyof T) => (value: string | Date | number | null | File) => {
        if (value instanceof Date) {
            const formattedDate = format(value, 'yyyy-MM-dd');
            setData(key, formattedDate);
        }
    };
};

export const createFileSetter = <T extends Record<string, any>>(
    setData: (key: keyof T, value: string | Date | number | null | File) => void
) => {
    return (key: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData(key, file);
        console.log(file ? file.name : 'No file selected');
    };
};

export const getStatusColors = (status: string) => {
    const statusColors: Record<string, string> = {
        rejected: 'bg-red-300 text-red-700',
        active: 'bg-sky-300 text-sky-700',
        inactive: 'bg-red-300 text-red-700',
        claimed: 'bg-green-300  text-green-700',
        under_review: 'bg-yellow-300 text-yellow-700',
        processing: 'bg-blue-300 text-blue-700',
        for_pickup: 'bg-violet-300 text-violet-700',
        default: 'bg-gray-300 text-gray-700',
    };

    const keyStatus = status.toLowerCase().replace(/\s+/g, '_');

    return statusColors[keyStatus] || statusColors.default;
};
