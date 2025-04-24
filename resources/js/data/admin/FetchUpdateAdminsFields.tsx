import { createDateSetter, createStringSetter } from "@/lib/utils";
import { CustomFormField, AdminForm, SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { format } from "date-fns";

export const AccountInfo = (data: AdminForm, setData: (key: keyof AdminForm, value: string | number | null) => void, errors: Partial<Record<keyof AdminForm, string>>): CustomFormField[] => {
	const { roles } = usePage<SharedData>().props

	return [
		{
			label: 'Username',
			type: 'text',
			id: 'username',
			disabled: data.admin_username === null,
			value: data.admin_username ?? 'N/A',
			tabIndex: -1,
			onChange: (e) => setData('admin_username', e.target.value),
			errorMessage: errors.admin_username,
		},
		{
			label: 'Role',
			type: 'select',
			id: 'role',
			disabled: data.admin_roleid === null,
			value: data.admin_roleid ?? 0,
			tabIndex: -2,
			onChange: (value: number) => setData('admin_roleid', value),
			errorMessage: errors.admin_roleid,
			selectItems: roles.map((role) => ({
				label: role.role_name,
				value: role.role_id
			}))
		},

		{
			label: 'Email',
			type: 'email',
			id: 'email',
			disabled: data.admin_email === null,
			value: data.admin_email ?? 'N/A',
			tabIndex: -3,
			onChange: (e) => setData('admin_email', e.target.value),
			errorMessage: errors.admin_email,
		},
	]
}

export const BarangayOfficerInfo = (data: AdminForm, setData: (key: keyof AdminForm, value: string | Date | number | null) => void, errors: Partial<Record<keyof AdminForm, string>>): CustomFormField[] => {
	const { puroks } = usePage<SharedData>().props
	return [
		{
			label: 'First Name',
			type: 'text',
			id: 'first_name',
			disabled: data.officer_firstname === null,
			value: data.officer_firstname ?? 'N/A',
			tabIndex: -4,
			onChange: (e) => setData('officer_firstname', e.target.value),
			errorMessage: errors.officer_firstname,
		},
		{
			label: 'Middle Name',
			type: 'text',
			id: 'middle_name',
			disabled: data.officer_middlename === null,
			value: data.officer_middlename ?? 'N/A',
			tabIndex: -5,
			onChange: (e) => setData('officer_middlename', e.target.value),
			errorMessage: errors.officer_middlename,
		},

		{
			label: 'Last Name',
			type: 'text',
			id: 'last_name',
			disabled: data.officer_lastname === null,
			value: data.officer_lastname ?? 'N/A',
			tabIndex: -6,
			onChange: (e) => setData('officer_lastname', e.target.value),
			errorMessage: errors.officer_lastname,
		},
		{
			label: 'Suffix',
			type: 'text',
			id: 'suffix',
			disabled: data.officer_suffix === null,
			value: data.officer_suffix ?? 'N/A',
			tabIndex: -7,
			onChange: (e) => setData('officer_suffix', e.target.value),
			errorMessage: errors.officer_suffix,
		},
		{
			label: 'Gender',
			type: 'text',
			id: 'gender',
			disabled: data.officer_gender === null,
			value: data.officer_gender ?? 'N/A',
			tabIndex: -8,
			onChange: (e) => setData('officer_gender', e.target.value),
			errorMessage: errors.officer_gender,
		},
		{
			label: 'Birthdate',
			type: 'date',
			id: 'birthdate',
			disabled: data.officer_birthdate === null,
			tabIndex: -10,
			value: data.officer_birthdate ? new Date(data.officer_birthdate) : 'N/A',
			onChange: (date: Date | null) => {
				setData('officer_birthdate', date ? format(date, 'yyyy-MM-dd') : '');
			},
			errorMessage: errors.officer_birthdate,
		},
		{
			label: 'Precinct Number',
			type: 'text',
			id: 'precinct_number',
			disabled: data.officer_precinct === null,
			value: data.officer_precinct ?? 'N/A',
			tabIndex: -11,
			onChange: (e) => setData('officer_precinct', e.target.value),
			errorMessage: errors.officer_precinct,
		},
		{
			label: 'Barangay Position',
			type: 'text',
			id: 'barangay_position',
			disabled: data.officer_position === null,
			value: data.officer_position ?? 'N/A',
			tabIndex: -12,
			onChange: (e) => setData('officer_position', e.target.value),
			errorMessage: errors.officer_position,
		},
		{
			label: 'Purok',
			type: 'select',
			id: 'purok',
			disabled: data.officer_purokid === null,
			value: data.officer_purokid ?? 0,
			tabIndex: -13,
			onChange: (value: number) => setData('officer_purokid', value),
			errorMessage: errors.officer_purokid,
			selectItems: puroks.map((purok) => ({
				label: purok.purok,
				value: purok.address_id,
			}))
		},
	]
}
