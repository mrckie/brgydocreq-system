import { CustomSidebar } from '@/components/custom/CustomSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Bell, CircleUser, KeyRound, SunMoon, FileInput } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: route('user.settings.profile.edit'),
        icon: CircleUser,
    },
    {
        title: 'Document Request',
        href: route('user.settings.document-request'),
        icon: FileInput,
    },
    {
        title: 'Notifications',
        href: route('user.settings.notification'),
        icon: Bell,
    },
    {
        title: 'Password',
        href: route('user.settings.password.edit'),
        icon: KeyRound,
    },

    {
        title: 'Appearance',
        href: route('user.settings.appearance'),
        icon: SunMoon,
    },
];

const temp =
    <div>
        <Avatar className="size-30">
            <AvatarImage src="/images/avatars/1.png" alt="Avatar" />
            <AvatarFallback>Profile</AvatarFallback>
        </Avatar>
    </div>

interface UserSettingsLayoutProps {
    children: React.ReactNode;
    title: string;
}

export default function UserSettingsLayout({ children, title }: UserSettingsLayoutProps) {
    return (
        <SidebarProvider>
            <CustomSidebar navItems={sidebarNavItems} navTitle={<CustomProfilePic />} />
            <SidebarInset>
                <main className="flex flex-col p-9">
                    <div className="rounded-t-md bg-linear-to-r from-teal-500 to-green-500 py-3 pl-5 text-white">
                        <h2 className="text-lg">{title}</h2>
                    </div>
                    <div className='border p-5 rounded-b-md shadow-sm'>
                        <section className="max-w-xl space-y-12">{children}</section>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
