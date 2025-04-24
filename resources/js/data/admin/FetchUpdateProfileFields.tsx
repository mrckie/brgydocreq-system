import { CustomFormField, AdminForm, SharedData, } from "@/types";
import { usePage } from "@inertiajs/react";
import { format } from "date-fns";

export const AccountInfo = (data: AdminForm, setData: (key: keyof AdminForm, value: string | number | null) => void, errors: Partial<Record<keyof AdminForm, string>>): CustomFormField[] => {
	const { roles } = usePage<SharedData>().props


	return [
		{
			label: 'Username',
			type: 'text',
			id: 'admin_username',
			value: data.admin_username,
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
			id: 'admin_email',
			value: data.admin_email,
			tabIndex: -2,
			onChange: (e) => setData('admin_email', e.target.value),
			errorMessage: errors.admin_email,
		},

		{
			label: 'Phone number',
			type: 'text',
			id: 'phone_num',
			value: data.admin_phonenum,
			tabIndex: -3,
			onChange: (e) => setData('admin_phonenum', e.target.value),
			errorMessage: errors.admin_phonenum,
		},
	]
}


export const BarangayOfficerInfo = (data: AdminForm, setData: (key: keyof AdminForm, value: string | Date | null) => void, errors: Partial<Record<keyof AdminForm, string>>): CustomFormField[] => {

	return [
		{
			label: 'First Name',
			type: 'text',
			id: 'first_name',
			disabled: true,
			value: data.officer_firstname,
			tabIndex: -1,
			onChange: (e) => setData('officer_firstname', e.target.value),
			errorMessage: errors.officer_firstname,
		},
		{
			label: 'Middle Name',
			type: 'text',
			id: 'middle_name',
			disabled: true,
			value: data.officer_middlename,
			tabIndex: -2,
			onChange: (e) => setData('officer_middlename', e.target.value),
			errorMessage: errors.officer_middlename,
		},

		{
			label: 'Last Name',
			type: 'text',
			id: 'last_name',
			disabled: true,
			value: data.officer_lastname,
			tabIndex: -3,
			onChange: (e) => setData('officer_lastname', e.target.value),
			errorMessage: errors.officer_lastname,
		},
		{
			label: 'Suffix',
			type: 'text',
			id: 'suffix',
			disabled: true,
			value: data.officer_suffix ?? 'N/A',
			tabIndex: -3,
			onChange: (e) => setData('officer_suffix', e.target.value),
			errorMessage: errors.officer_suffix,
		},
		{
			label: 'Birthdate',
			type: 'date',
			id: 'birthdate',
			disabled: true,
			tabIndex: -5,
			value: data.officer_birthdate,
			onChange: (date: Date | null) => {
				setData('officer_birthdate', date ? format(date, 'yyyy-MM-dd') : '');
			},
			errorMessage: errors.officer_birthdate,
		},
		{
			label: 'Gender',
			type: 'text',
			id: 'gender',
			disabled: true,
			value: data.officer_gender,
			tabIndex: -6,
			onChange: (e) => setData('officer_gender', e.target.value),
			errorMessage: errors.officer_gender,
		},

		{
			label: 'Precinct Number',
			type: 'text',
			id: 'precinct_number',
			disabled: true,
			value: data.officer_precinct,
			tabIndex: -7,
			onChange: (e) => setData('officer_precinct', e.target.value),
			errorMessage: errors.officer_precinct,
		},
		{
			label: 'Purok',
			type: 'text',
			id: 'purok',
			disabled: true,
			value: data.officer_purok,
			tabIndex: -8,
			onChange: (e) => setData('officer_purok', e.target.value),
			errorMessage: errors.officer_purok,

		},
		{
			label: 'Building Serial Number',
			type: 'text',
			id: 'building_number',
			disabled: true,
			value: data.officer_householdnum,
			tabIndex: -9,
			onChange: (e) => setData('officer_householdnum', e.target.value),
			errorMessage: errors.officer_householdnum,
		},
	]
}

