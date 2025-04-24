import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

interface CustomSelectProps {
	placeholder?: string;
	items: { value: number, label: string }[];
	className?: string;	
	onChange?: (value: number) => void;
	value: number | null;
}

const CustomSelect = ({ placeholder, items = [], className, onChange, value, }: CustomSelectProps) => {
	return (
		<Select value={value !== null ? value.toString() : undefined} onValueChange={(val) => onChange?.(parseInt(val))}>
			<SelectTrigger className={`w-full ${className}`}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{items.map((item, index) => (
						<SelectItem key={index} value={item.value.toString()}>{item.label}</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

export default CustomSelect