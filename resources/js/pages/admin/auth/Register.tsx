import CustomForm from '@/components/custom/CustomFormFields'
import AuthCardLayout from '@/layouts/shared/AuthCardLayout'
import { PersonalDetails } from '@/data/admin/AdminRegisterFields'
import { AccountDetails } from '@/data/admin/AdminRegisterFields'
import { Button } from '@/components/ui/button'
import { useForm } from '@inertiajs/react'
import { AdminRegisterForm } from '@/types'
import { FormEventHandler } from 'react'
import { LoaderCircleIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface RegisterProps {
	email: string;
	role_name: string;
	invite_token: string;
}

const Register = ({ email, role_name, invite_token, }: RegisterProps) => {
	const { data, setData, errors, post, processing } = useForm<Required<AdminRegisterForm>>({
		officer_firstname: '',
		officer_middlename: '',
		officer_lastname: '',
		officer_suffix: '',
		officer_birthdate: null,
		officer_householdnum: '',
		admin_email: email ?? '',
		admin_phonenum: '',
		admin_username: '',
		admin_role: role_name ?? '',
		admin_password: '',
		admin_password_confirmation: '',
		invite_token: invite_token ?? ''

	});


	const handleSubmit: FormEventHandler = (e) => {
		console.log(data);
		e.preventDefault();
		post(route('admin.register.store'),
			{
				onError: (errors) => {
					console.error('Form submission failed. Validation errors:');
					Object.entries(errors).forEach(([field, message]) => {
						console.error(`Field: ${field}, Error: ${message}`);
					});
				},

			});
	}

	return (

		<AuthCardLayout title='Administrator Registration' description='Create an account to access the admin panel'>
			<form onSubmit={handleSubmit}>
				<CustomForm title='Personal Details' fields={PersonalDetails(data, setData, errors)} className='grid grid-cols-2 gap-x-5 mb-5' />
				<CustomForm title='Account Details' fields={AccountDetails(data, setData, errors)} className='grid grid-cols-2 gap-x-5 mb-5' />
				<Input defaultValue={invite_token} hidden></Input>
				<div className='text-center pt-6'>
					<Button type='submit' className='w-1/4' tabIndex={13} disabled={processing}>
						{processing && <LoaderCircleIcon className="h-4 w-4 animate-spin" />}
						Submit
					</Button>
				</div>
			</form>
		</AuthCardLayout>

	)
}

export default Register