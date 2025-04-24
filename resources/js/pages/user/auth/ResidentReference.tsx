import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import TextLink from '@/components/custom/CustomTextLink';
import { Button } from '@/components/ui/button';
import AuthSplitLayout from '@/layouts/shared/AuthSplitLayout';
import ResidentVerification from '../../../../assets/verification-side-image.svg';
import { FormEventHandler } from 'react';
import { ResidentVerificationForm } from '@/types';
import { ResidentReferenceFormFields } from '@/data/user/ResidentReferenceFormFields';
import CustomForm from '@/components/custom/CustomFormFields';
import { toast, Toaster } from 'sonner';


const ResidentReference = () => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ResidentVerificationForm>>({
        resident_firstname: '',
        resident_middlename: '',
        resident_lastname: '',
        resident_birthdate: '',
        resident_suffix: '',
        email: '',
        phone_number: '',
        resident_householdnum: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('user.resident-reference.store'), {
            onSuccess: () => {
                toast.success('Reference number successfully sent to your email')
                reset();
            },
            onError: (errors) => {
                if (errors.message === 'Record not found') {
                    toast.error('Record not found.')
                }
            },
        })
    }

    return (

        <AuthSplitLayout
            title="Resident Verification"
            description="Enter your personal details to verify your residency and receive your reference number"
            image={ResidentVerification}

        >
            <Head title="Resident Verification" />
            <Toaster richColors position="top-right" />
            <form className="mt-4 flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="grid gap-5">

                    <CustomForm fields={ResidentReferenceFormFields(data, setData, errors)} className='grid grid-cols-2 gap-3' />

                    <Button type="submit" variant="primary" className="mt-5 w-full" tabIndex={8} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Request Reference Number
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Already have a reference number?{' '}
                    <TextLink href={route('user.register')} tabIndex={9} >
                        Sign up
                    </TextLink>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthSplitLayout>
    );
};

export default ResidentReference;
