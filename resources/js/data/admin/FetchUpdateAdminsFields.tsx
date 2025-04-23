import { createDateSetter, createStringSetter } from "@/lib/utils";
import { CustomFormField, AdminFetch, SharedData } from "@/types";
import { usePage } from "@inertiajs/react";

export const AccountInfo = (data: AdminFetch, setData: (key: keyof AdminFetch, value: string | Date | number | null) => void, errors: Partial<Record<keyof AdminFetch, string>>): CustomFormField[] => {
	const stringSetter = createStringSetter(setData);
	const {roles} = usePage<SharedData>().props

	return [
		{
			label: 'Username',
			type: 'text',
			id: 'username',
			disabled: data.admin_username === null,
			value: data.admin_username ?? 'N/A',
			tabIndex: -1,
			onChange: stringSetter('admin_username'),
			errorMessage: errors.admin_username,
		},
		{
			label: 'Role',
			type: 'select',
			id: 'role',
			disabled: data.admin_role === null,
			value: data.admin_role ?? 'N/A',
			tabIndex: -2,
			onChange: stringSetter('admin_role'),
			errorMessage: errors.admin_role,
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
			onChange: stringSetter('admin_email'),
			errorMessage: errors.admin_email,
		},
	]
}

export const BarangayOfficerInfo = (data: AdminFetch, setData: (key: keyof AdminFetch, value: string | Date | number | null) => void, errors: Partial<Record<keyof AdminFetch, string>>): CustomFormField[] => {
	const stringSetter = createStringSetter(setData);
	const dateSetter = createDateSetter(setData);

	return [
		{
			label: 'First Name',
			type: 'text',
			id: 'first_name',
			disabled: data.officer_firstname === null,
			value: data.officer_firstname ?? 'N/A',
			tabIndex: -4,
			onChange: stringSetter('officer_firstname'),
			errorMessage: errors.officer_firstname,
		},
		{
			label: 'Middle Name',
			type: 'text',
			id: 'middle_name',
			disabled: data.officer_middlename === null,
			value: data.officer_middlename ?? 'N/A',
			tabIndex: -5,
			onChange: stringSetter('officer_middlename'),
			errorMessage: errors.officer_middlename,
		},

		{
			label: 'Last Name',
			type: 'text',
			id: 'last_name',
			disabled: data.officer_lastname === null,
			value: data.officer_lastname ?? 'N/A',
			tabIndex: -6,
			onChange: stringSetter('officer_lastname'),
			errorMessage: errors.officer_lastname,
		},
		{
			label: 'Suffix',
			type: 'text',
			id: 'suffix',
			disabled: data.officer_suffix === null,
			value: data.officer_suffix ?? 'N/A',
			tabIndex: -7,
			onChange: stringSetter('officer_suffix'),
			errorMessage: errors.officer_suffix,
		},
		{
			label: 'Gender',
			type: 'text',
			id: 'gender',
			disabled: data.officer_gender === null,
			value: data.officer_gender ?? 'N/A',
			tabIndex: -8,
			onChange: stringSetter('officer_gender'),
			errorMessage: errors.officer_gender,
		},
		{
			label: 'Birthdate',
			type: 'date',
			id: 'birthdate',
			disabled: data.officer_birthdate === null,
			tabIndex: -10,
			value: data.officer_birthdate ? new Date(data.officer_birthdate) : 'N/A',
			onChange: dateSetter('officer_birthdate'),
			errorMessage: errors.officer_birthdate,
		},
		{
			label: 'Precinct Number',
			type: 'text',
			id: 'precinct_number',
			disabled: data.officer_precinct === null,
			value: data.officer_precinct ?? 'N/A',
			tabIndex: -11,
			onChange: stringSetter('officer_precinct'),
			errorMessage: errors.officer_precinct,
		},
		{
			label: 'Barangay Position',
			type: 'text',
			id: 'barangay_position',
			disabled: data.officer_position === null,
			value: data.officer_position ?? 'N/A',
			tabIndex: -12,
			onChange: stringSetter('officer_position'),
			errorMessage: errors.officer_position,
		},
		{
			label: 'Purok',
			type: 'text',
			id: 'purok',
			disabled: data.officer_purok === null,
			value: data.officer_purok ?? 'N/A',
			tabIndex: -13,
			onChange: stringSetter('officer_purok'),
			errorMessage: errors.officer_purok,
		},
	]
}
