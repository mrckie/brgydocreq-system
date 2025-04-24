import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/custom/appearance-tabs';
import HeadingSmall from '@/components/custom/heading-small';
import UserSettingsLayout from '@/layouts/user/UserSettingsLayout';

export default function Appearance() {
    return (
        <>
            <Head title="Appearance settings" />
            <UserSettingsLayout title="Appearance">
                <div className="space-y-6">
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    <AppearanceTabs />
                </div>
            </UserSettingsLayout>
        </>
    );
}
