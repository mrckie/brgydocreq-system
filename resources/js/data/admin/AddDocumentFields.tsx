import { createDateSetter, createStringSetter } from "@/lib/utils";
import { Document, CustomFormField, SharedData } from "@/types";
import { usePage } from "@inertiajs/react";


export const addFirstHalve = (data: Omit<Document, 'document_id'>, setData: (key: keyof Omit<Document, 'document_id'>, value: string | Date | number | null) => void, errors: Partial<Record<keyof Omit<Document, 'document_id'>, string>>): CustomFormField[] => {
	const stringSetter = createStringSetter(setData);
	const { status } = usePage<SharedData>().props

	return [
		{
			label: 'Document Name',
			type: 'text',
			id: 'document_name',
			placeholder: 'Barangay Clearance',
			autofocus: true,
			value: data.document_name,
			tabIndex: 1,
			autoComplete: 'document',
			onChange: stringSetter('document_name'),
			errorMessage: errors.document_name,
		},
		{
			label: 'Price',
			type: 'text',
			id: 'price',
			placeholder: '₱50',
			value: data.price,
			tabIndex: 2,
			autoComplete: 'amount',
			onChange: stringSetter('price'),
			errorMessage: errors.price,
		},

		{
			label: 'Document Photo',
			type: 'file',
			id: 'last_name',
			value: data.document_photopath,
			tabIndex: 3,
			onChange: stringSetter('document_photopath'),
			errorMessage: errors.document_photopath,
		},
		{
			label: 'Status',
			type: 'select',
			id: 'status',
			value: data.status_id,
			tabIndex: 4,
			onChange: stringSetter('status_id'),
			errorMessage: errors.status_id,
			selectItems: status.map((status) => ({
				label: status.status_name,
				value: status.status_id
			}))
		},
	]
}


export const addSecondHalve = (data: Omit<Document, 'document_id'>, setData: (key: keyof Omit<Document, 'document_id'>, value: string | Date | number | null) => void, errors: Partial<Record<keyof Omit<Document, 'document_id'>, string>>): CustomFormField[] => {
	const stringSetter = createStringSetter(setData);
	
	return [
		{
			label: 'Description',
			type: 'textarea',
			id: 'description',
			value: data.description,
			tabIndex: 4,
			onChange: stringSetter('description'),
			errorMessage: errors.description,
			additionalProps: {
				className: 'h-24',
			}
		},
	]
}