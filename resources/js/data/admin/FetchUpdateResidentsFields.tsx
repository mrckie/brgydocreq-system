import { CustomFormField, ResidentFetch, SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { format } from "date-fns";

export const FetchUpdateResidentsFields = (data: ResidentFetch, setData: (key: keyof ResidentFetch, value: string | Date | number | null) => void, errors: Partial<Record<keyof ResidentFetch, string>>): CustomFormField[] => {
	const { puroks, status } = usePage<SharedData>().props

	return [
		{
			label: 'First Name',
			type: 'text',
			id: 'first_name',
			disabled: data.resident_firstname === null,
			value: data.resident_firstname ?? 'N/A',
			tabIndex: -1,
			onChange: (e) => setData('resident_firstname', e.target.value),
			errorMessage: errors.resident_firstname,
		},
		{
			label: 'Middle Name',
			type: 'text',
			id: 'middle_name',
			disabled: data.resident_middlename === null,
			value: data.resident_middlename ?? 'N/A',
			tabIndex: -2,
			onChange: (e) => setData('resident_middlename', e.target.value),
			errorMessage: errors.resident_middlename,
		},

		{
			label: 'Last Name',
			type: 'text',
			id: 'last_name',
			disabled: data.resident_lastname === null,
			value: data.resident_lastname ?? 'N/A',
			tabIndex: -3,
			onChange: (e) => setData('resident_lastname', e.target.value),
			errorMessage: errors.resident_lastname,
		},
		{
			label: 'Suffix',
			type: 'text',
			id: 'suffix',
			disabled: data.resident_suffix === null,
			value: data.resident_suffix ?? 'N/A',
			tabIndex: -4,
			onChange: (e) => setData('resident_suffix', e.target.value),
			errorMessage: errors.resident_suffix,
		},
		{
			label: 'Birthdate',
			type: 'date',
			id: 'birthdate',
			disabled: data.resident_birthdate === null,
			tabIndex: -5,
			value: data.resident_birthdate ?? 'N/A',
			onChange: (date: Date | null) => {
				setData('resident_birthdate', date ? format(date, 'yyyy-MM-dd') : '');
			},
			errorMessage: errors.resident_birthdate,
		},
		{
			label: 'Gender',
			type: 'text',
			id: 'gender',
			disabled: data.resident_gender === null,
			value: data.resident_gender ?? 'N/A',
			tabIndex: -6,
			onChange: (e) => setData('resident_gender', e.target.value),
			errorMessage: errors.resident_gender,
		},

		{
			label: 'Precinct Number',
			type: 'text',
			id: 'precinct_number',
			disabled: data.resident_precinct === null,
			value: data.resident_precinct ?? 'N/A',
			tabIndex: -7,
			onChange: (e) => setData('resident_precinct', e.target.value),
			errorMessage: errors.resident_precinct,
		},
		{
			label: 'Purok',
			type: 'select',
			id: 'purok',
			disabled: data.resident_purokid === null,
			value: data.resident_purokid ?? 0,
			tabIndex: -13,
			onChange: (value: number) => setData('resident_purokid', value),
			errorMessage: errors.resident_purokid,
			selectItems: puroks.map((purok) => ({
				label: purok.purok,
				value: purok.address_id,
			}))
		},
		{
			label: 'Building Serial Number',
			type: 'text',
			id: 'building_number',
			disabled: data.resident_householdnum === null,
			value: data.resident_householdnum ?? 'N/A',
			tabIndex: -9,
			onChange: (e) => setData('resident_householdnum', e.target.value),
			errorMessage: errors.resident_householdnum,
		},
		{
			label: 'Status',
			type: 'select',
			id: 'status',
			disabled: data.resident_statusid === null,
			value: data.resident_statusid ?? 0,
			tabIndex: -6,
			onChange: (value: number) => setData('resident_statusid', value),
			errorMessage: errors.resident_statusid,
			selectItems: status.map((status) => ({
				label: status.status_name,
				value: status.status_id,
			})),
		},
	]
}
