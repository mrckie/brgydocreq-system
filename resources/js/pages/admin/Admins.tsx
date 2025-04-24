import CustomDialog from '@/components/custom/CustomDialog';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, } from 'react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/custom/InputError';
import { AdminForm, InviteForm, SharedData } from '@/types';
import { AdminCustomCard } from '@/components/custom/CustomCard';
import CustomSelect from '@/components/custom/CustomSelect';
import { AccountInfo, BarangayOfficerInfo } from '@/data/admin/FetchUpdateAdminsFields';
import CustomForm from '@/components/custom/CustomFormFields';
import DefaultProfilePic from '../../../assets/default_profilepic.svg'


const Admins = () => {
    const { admins, roles } = usePage<SharedData>().props

    // invite admin
    const { data: inviteData, setData: inviteSetData, post: invitePost, processing: inviteProcessing, errors: inviteErrors } = useForm<Required<InviteForm>>({
        email: '',
        role_id: null,
    });

    const inviteSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        invitePost(route('admin.invite'), {
            onError: (errors) => {
                console.error('Form submission failed. Validation errors:');
                Object.entries(errors).forEach(([field, message]) => {
                    console.error(`Field: ${field}, Error: ${message}`);
                });
            },
        });
    }


    // update and fetch admin
    const { data: updateData, setData: updateSetData, patch: updatePost, processing: updateProcessing, errors: updateErrors } = useForm<Required<AdminForm>>({
        admin_id: 0,
        admin_photopath: null,
        admin_roleid: null,
        admin_username: '',
        admin_email: '',
        admin_role: '',
        officer_firstname: '',
        officer_middlename: '',
        officer_lastname: '',
        officer_suffix: '',
        officer_birthdate: '',
        officer_precinct: '',
        officer_householdnum: '',
        officer_position: '',
        officer_gender: '',
        officer_purok: '',
        officer_purokid: null,
    });

    const updateSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        updatePost(route('admin.admins.update', updateData.admin_id), {
            onError: (errors) => {
                console.error('Form submission failed. Validation errors:');
                Object.entries(errors).forEach(([field, message]) => {
                    console.error(`Field: ${field}, Error: ${message}`);
                });
            },
        })
    }


    const handleOpenDialog = (admin: AdminForm) => {
        updateSetData({
            admin_id: admin.admin_id,
            admin_username: admin.admin_username,
            admin_email: admin.admin_email,
            admin_photopath: admin.admin_photopath,
            admin_roleid: admin.admin_roleid,
            admin_role: admin.admin_role,
            officer_firstname: admin.officer_firstname,
            officer_middlename: admin.officer_middlename,
            officer_lastname: admin.officer_lastname,
            officer_suffix: admin.officer_suffix,
            officer_birthdate: admin.officer_birthdate,
            officer_precinct: admin.officer_precinct,
            officer_householdnum: admin.officer_householdnum,
            officer_position: admin.officer_position,
            officer_gender: admin.officer_gender,
            officer_purok: admin.officer_purok,
            officer_purokid: admin.officer_purokid,
        });
    }


    return (
        <AdminLayout title='Administrator'>
            <div className='flex flex-row justify-end'>
                <CustomDialog trigger={
                    <Button className='w-1/7'>Invite</Button>
                } children={
                    <>
                        <div className='flex gap-x-4'>
                            <Input id='email' value={inviteData.email} onChange={(e) => inviteSetData('email', e.target.value)} placeholder='Email' required />
                            <InputError message={inviteErrors.email} />
                            <div className='w-1/2'>
                                <CustomSelect
                                    placeholder='Role'
                                    value={inviteData.role_id}
                                    onChange={(value) => { inviteSetData('role_id', value), console.log(value) }}
                                    items={roles.map((role) => (
                                        { value: role.role_id, label: role.role_name }
                                    ))}
                                />
                                <InputError message={inviteErrors.role_id} />
                            </div>
                        </div>
                    </>

                } button={
                    <Button type='submit' disabled={inviteProcessing}>
                        {inviteProcessing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Send
                    </Button>

                } title='Invite Administrator' width='w-130' onSubmit={inviteSubmit} />

            </div>
            <div className='grid grid-cols-3 gap-x-3'>
                {admins.map((admin, index) => (
                    <CustomDialog
                        key={index}
                        title='Administrator Profile'
                        button={<Button type='submit' disabled={updateProcessing} variant="primary">Save</Button>}
                        trigger={
                            <AdminCustomCard
                                image={admin.admin_photopath ? `/storage/${admin.admin_photopath}` : DefaultProfilePic}
                                title={`Hon. ${admin.officer_firstname} ${admin.officer_middlename} ${admin.officer_lastname} ${admin.officer_suffix || ''}`}
                                description={admin.officer_position}
                                content={admin.admin_role}
                                onClick={() => handleOpenDialog(admin)}
                            />
                        }
                        onSubmit={updateSubmit}
                        children={
                            <>
                                <Input type="text" hidden defaultValue={updateData.admin_id} />
                                <CustomForm title='Account Information' fields={AccountInfo(updateData, updateSetData, updateErrors)} className='grid grid-cols-3 gap-x-5 mb-3' />
                                <CustomForm title='Personal Information' fields={BarangayOfficerInfo(updateData, updateSetData, updateErrors)} className='grid grid-cols-3 gap-x-5' />
                            </>

                        }
                    />
                ))
                }
            </div>
        </AdminLayout>
    );
};

export default Admins;
