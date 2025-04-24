import { UserInfo } from '@/components/custom/UserInfo';
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { UserForm, type AdminForm } from '@/types';
import { Link } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';

interface CustomMenuContentProps {
    admin?: AdminForm;
    user?: UserForm;
}

export function CustomMenuContent({ user, admin }: CustomMenuContentProps) {
    const cleanup = useMobileNavigation();

    return (
        admin ? (
            <>
                <DropdownMenuGroup className="p-0 font-normal">
                    <DropdownMenuItem asChild>
                        <Link href={route('admin.dashboard')} as='button' prefetch onClick={cleanup} className="flex items-center gap-2 px-1 py-1.5 text-left text-sm w-full cursor-pointer">
                            <UserInfo admin={admin} />
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link className="block w-full cursor-pointer" href={route('admin.settings.profile.edit')} as="button" prefetch onClick={cleanup}>
                            <Settings className="mr-2" />
                            Settings
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link className="block w-full cursor-pointer" method="post" href={route('admin.logout')} as="button" onClick={cleanup}>
                        <LogOut className="mr-2" />
                        Log out
                    </Link>
                </DropdownMenuItem>
            </>

        ) : user ? (
            <>
                <DropdownMenuGroup className="p-0 font-normal">
                    <DropdownMenuItem asChild>
                        <Link href={route('user.settings.profile.edit')} as='button' prefetch onClick={cleanup} className="flex items-center gap-2 px-1 py-1.5 text-left text-sm w-full cursor-pointer">
                            <UserInfo user={user} />
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link className="block w-full cursor-pointer" href={route('user.settings.profile.edit')} as="button" prefetch onClick={cleanup}>
                            <Settings className="mr-2" />
                            Settings
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link className="block w-full cursor-pointer" method="post" href={route('user.logout')} as="button" onClick={cleanup}>
                        <LogOut className="mr-2" />
                        Log out
                    </Link>
                </DropdownMenuItem>
            </>
        ) : null);
}


