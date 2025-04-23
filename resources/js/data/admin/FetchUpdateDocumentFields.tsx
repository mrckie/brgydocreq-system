import { createStringSetter } from "@/lib/utils";
import { CustomFormField, Document, SharedData } from "@/types";
import { usePage } from "@inertiajs/react";

export const fetchUpdateFirstHalve = (data: Document, setData: (key: keyof Document, value: string | Date | number | null) => void, errors: Partial<Record<keyof Document, string>>): CustomFormField[] => {
	const stringSetter = createStringSetter(setData);
	const { status } = usePage<SharedData>().props

	return [
		{
			label: 'Document Name',
			type: 'text',
			id: 'document',
			disabled: data.document_name === null,
			value: data.document_name ?? 'N/A',
			tabIndex: -1,
			onChange: stringSetter('document_name'),
			errorMessage: errors.document_name,
		},
		{
			label: 'Price',
			type: 'text',
			id: 'price',
			disabled: data.price === null,
			value: data.price ?? 'N/A',
			tabIndex: -3,
			onChange: stringSetter('price'),
			errorMessage: errors.price,
		},
		{
			label: 'Document Photo',
			type: 'text',
			id: 'document_photo',
			disabled: data.document_photopath === null,
			value: data.document_photopath ?? 'N/A',
			tabIndex: -4,
			onChange: stringSetter('document_photopath'),
			errorMessage: errors.document_photopath,
		},
		{
			label: 'Status',
			type: 'select',
			id: 'status',
			disabled: data.status_id === null,
			value: data.status_id ?? 'N/A',
			tabIndex: -6,
			onChange: stringSetter('status_id'),
			errorMessage: errors.status_id,
			selectItems: status.map((status) => ({
				label: status.status_name,
				value: status.status_id
			}))
		},
	]
}


export const fetchUpdateSecondHalve = (data: Document, setData: (key: keyof Document, value: string | Date | number | null) => void, errors: Partial<Record<keyof Document, string>>): CustomFormField[] => {
	const stringSetter = createStringSetter(setData);

	return [
		{
			label: 'Description',
			type: 'textarea',
			id: 'description',
			disabled: data.description === null,
			value: data.description ?? 'N/A',
			tabIndex: -2,
			onChange: stringSetter('description'),
			errorMessage: errors.description,
			additionalProps: {
				className: 'h-24',
			}
		},
	]
}

