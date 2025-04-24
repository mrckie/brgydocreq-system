import { CustomFormField, UserForm, SharedData } from "@/types";
import { format } from "date-fns";

export const AccountInfo = (data: UserForm, setData: (key: keyof UserForm, value: string | null) => void, errors: Partial<Record<keyof UserForm, string>>): CustomFormField[] => {

	return [
		{
			label: 'Username',
			type: 'text',
			id: 'username',
			value: data.username,
			tabIndex: -1,
			onChange: (e) => setData('username', e.target.value),
			errorMessage: errors.username,
		},
		{
			label: 'Email',
			type: 'email',
			id: 'email',
			value: data.user_email,
			tabIndex: -2,
			onChange: (e) => setData('user_email', e.target.value),
			errorMessage: errors.user_email,
		},

		{
			label: 'Phone number',
			type: 'text',
			id: 'phone_num',
			value: data.user_phonenum,
			tabIndex: -3,
			onChange: (e) => setData('user_phonenum', e.target.value),
			errorMessage: errors.user_phonenum,
		},
	]
}


export const ResidentInfo = (data: UserForm, setData: (key: keyof UserForm, value: string | Date | null) => void, errors: Partial<Record<keyof UserForm, string>>): CustomFormField[] => {

	return [
		{
			label: 'First Name',
			type: 'text',
			id: 'first_name',
			disabled: true,
			value: data.resident_firstname,
			tabIndex: -1,
			onChange: (e) => setData('resident_firstname', e.target.value),
			errorMessage: errors.resident_firstname,
		},
		{
			label: 'Middle Name',
			type: 'text',
			id: 'middle_name',
			disabled: true,
			value: data.resident_middlename,
			tabIndex: -2,
			onChange: (e) => setData('resident_middlename', e.target.value),
			errorMessage: errors.resident_middlename,
		},

		{
			label: 'Last Name',
			type: 'text',
			id: 'last_name',
			disabled: true,
			value: data.resident_lastname,
			tabIndex: -3,
			onChange: (e) => setData('resident_lastname', e.target.value),
			errorMessage: errors.resident_lastname,
		},
		{
			label: 'Suffix',
			type: 'text',
			id: 'suffix',
			disabled: true,
			value: data.resident_suffix ?? 'N/A',
			tabIndex: -3,
			onChange: (e) => setData('resident_suffix', e.target.value),
			errorMessage: errors.resident_suffix,
		},
		{
			label: 'Birthdate',
			type: 'date',
			id: 'birthdate',
			disabled: true,
			tabIndex: -5,
			value: data.resident_birthdate,
			onChange: (date: Date | null) => {
				setData('resident_birthdate', date ? format(date, 'yyyy-MM-dd') : '');
			},
			errorMessage: errors.resident_birthdate,
		},
		{
			label: 'Gender',
			type: 'text',
			id: 'gender',
			disabled: true,
			value: data.resident_gender,
			tabIndex: -6,
			onChange: (e) => setData('resident_gender', e.target.value),
			errorMessage: errors.resident_gender,
		},

		{
			label: 'Precinct Number',
			type: 'text',
			id: 'precinct_number',
			disabled: true,
			value: data.resident_precinct,
			tabIndex: -7,
			onChange: (e) => setData('resident_precinct', e.target.value),
			errorMessage: errors.resident_precinct,
		},
		{
			label: 'Purok',
			type: 'text',
			id: 'purok',
			disabled: true,
			value: data.resident_purok,
			tabIndex: -8,
			onChange: (e) => setData('resident_purok', e.target.value),
			errorMessage: errors.resident_purok,

		},
		{
			label: 'Building Serial Number',
			type: 'text',
			id: 'building_number',
			disabled: true,
			value: data.resident_householdnum,
			tabIndex: -9,
			onChange: (e) => setData('resident_householdnum', e.target.value),
			errorMessage: errors.resident_householdnum,
		},
	]
}

