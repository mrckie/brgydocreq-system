import { AdminForm, type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { AccountInfo, BarangayOfficerInfo } from '@/data/admin/FetchUpdateProfileFields';
import DeleteUser from '@/components/custom/delete-user';
import { Button } from '@/components/ui/button';
import AdminSettingsLayout from '@/layouts/admin/AdminSettingsLayout';
import CustomForm from '@/components/custom/CustomFormFields';
import { NotebookPenIcon } from 'lucide-react';


export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;
    console.log(auth);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<AdminForm>>({
        admin_id: auth.admin.admin_id,
        admin_username: auth.admin.admin_username,
        admin_email: auth.admin.admin_email,
        admin_phonenum: auth.admin.admin_phonenum,
        admin_photopath: auth.admin.admin_photopath,
        admin_roleid: auth.admin.admin_roleid,
        admin_role: auth.admin.admin_role,
        officer_firstname: auth.admin.officer_firstname,
        officer_middlename: auth.admin.officer_middlename,
        officer_lastname: auth.admin.officer_lastname,
        officer_suffix: auth.admin.officer_suffix,
        officer_gender: auth.admin.officer_gender,
        officer_birthdate: auth.admin.officer_birthdate,
        officer_position: auth.admin.officer_position,
        officer_precinct: auth.admin.officer_precinct,
        officer_householdnum: auth.admin.officer_householdnum,
        officer_purokid: auth.admin.officer_purokid,
        officer_purok: auth.admin.officer_purok,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Profile settings" />
            <AdminSettingsLayout title='Profile information'>
                <form onSubmit={submit} className="space-y-6">
                    <CustomForm className='grid grid-cols-3 gap-x-5' fields={AccountInfo(data, setData, errors)} />
                    <div className='flex justify-end'>
                        <Button disabled={processing}>Save</Button>
                    </div>
                </form>
                <div className='bg-amber-300 p-4 rounded-md'>
                    <article className='flex text-justify '>
                        <span>
                            <NotebookPenIcon size={25} className='mr-2 mt-1' />
                        </span>
                        Your personal details below are based on official records provided by the Barangay and is managed by authorized personnel. For consistency and accuracy, this information cannot be edited by users.  If you need to make corrections or updates, please visit or contact the Barangay office directly. All updates will be reflected in the system once confirmed by the Barangay.
                    </article>
                </div>
                <CustomForm className='grid grid-cols-3 gap-x-5' fields={BarangayOfficerInfo(data, setData, errors)} />

                {/* {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Your email address is unverified.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )} */}

                <DeleteUser />
            </AdminSettingsLayout>
        </>
    );
}
