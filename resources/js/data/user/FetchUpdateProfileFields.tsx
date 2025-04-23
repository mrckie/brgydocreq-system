import { createDateSetter, createStringSetter } from "@/lib/utils";
import { CustomFormField, UserForm, SharedData } from "@/types";

export const AccountInfo = (data: UserForm, setData: (key: keyof UserForm, value: string | Date | number | null) => void, errors: Partial<Record<keyof UserForm, string>>): CustomFormField[] => {
	const stringSetter = createStringSetter(setData);

	return [
		{
			label: 'Username',
			type: 'text',
			id: 'username',
			value: data.username,
			tabIndex: -1,
			onChange: stringSetter('username'),
			errorMessage: errors.username,
		},
		{
			label: 'Email',
			type: 'email',
			id: 'email',
			value: data.user_email,
			tabIndex: -2,
			onChange: stringSetter('user_email'),
			errorMessage: errors.user_email,
		},

		{
			label: 'Phone number',
			type: 'text',
			id: 'phone_num',
			value: data.user_phonenum,
			tabIndex: -3,
			onChange: stringSetter('user_phonenum'),
			errorMessage: errors.user_phonenum,
		},
	]
}


export const ResidentInfo = (data: UserForm, setData: (key: keyof UserForm, value: string | Date | number | null) => void, errors: Partial<Record<keyof UserForm, string>>): CustomFormField[] => {
	const stringSetter = createStringSetter(setData);
	const dateSetter = createDateSetter(setData);

	return [
		{
			label: 'First Name',
			type: 'text',
			id: 'first_name',
			disabled: true,
			value: data.resident_firstname,
			tabIndex: -1,
			onChange: stringSetter('resident_firstname'),
			errorMessage: errors.resident_firstname,
		},
		{
			label: 'Middle Name',
			type: 'text',
			id: 'middle_name',
			disabled: true,
			value: data.resident_middlename,
			tabIndex: -2,
			onChange: stringSetter('resident_middlename'),
			errorMessage: errors.resident_middlename,
		},

		{
			label: 'Last Name',
			type: 'text',
			id: 'last_name',
			disabled: true,
			value: data.resident_lastname,
			tabIndex: -3,
			onChange: stringSetter('resident_lastname'),
			errorMessage: errors.resident_lastname,
		},
		{
			label: 'Suffix',
			type: 'text',
			id: 'suffix',
			disabled: true,
			value: data.resident_suffix,
			tabIndex: -4,
			onChange: stringSetter('resident_suffix'),
			errorMessage: errors.resident_suffix,
		},
		{
			label: 'Birthdate',
			type: 'date',
			id: 'birthdate',
			disabled: true,
			tabIndex: -5,
			value: data.resident_birthdate,
			onChange: dateSetter('resident_birthdate'),
			errorMessage: errors.resident_birthdate,
		},
		{
			label: 'Gender',
			type: 'text',
			id: 'gender',
			disabled: true,
			value: data.resident_gender,
			tabIndex: -6,
			onChange: stringSetter('resident_gender'),
			errorMessage: errors.resident_gender,
		},

		{
			label: 'Precinct Number',
			type: 'text',
			id: 'precinct_number',
			disabled: true,
			value: data.resident_precinct,
			tabIndex: -7,
			onChange: stringSetter('resident_precinct'),
			errorMessage: errors.resident_precinct,
		},
		{
			label: 'Purok',
			type: 'text',
			id: 'purok',
			disabled: true,
			value: data.resident_purok,
			tabIndex: -8,
			onChange: stringSetter('resident_purok'),
			errorMessage: errors.resident_purok,

		},
		{
			label: 'Building Serial Number',
			type: 'text',
			id: 'building_number',
			disabled: true,
			value: data.resident_householdnum,
			tabIndex: -9,
			onChange: stringSetter('resident_householdnum'),
			errorMessage: errors.resident_householdnum,
		},
	]
}

