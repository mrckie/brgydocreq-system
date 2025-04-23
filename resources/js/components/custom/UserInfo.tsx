import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/UseInitials';
import { UserForm, type Admin } from '@/types';

interface UserInfoProps {
    user?: UserForm;
    admin?: Admin;
}


export function UserInfo({ user, admin }: UserInfoProps) {
    const getInitials = useInitials();

    return (admin ? (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={admin.admin_photopath} alt={admin.admin_username} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(admin.admin_username)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{admin.admin_username}</span>
                <span className="text-muted-foreground truncate text-xs">{admin.admin_role}</span>
            </div>
        </>
    ) : user ? (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.user_photopath} alt={user.username} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.username)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.username}</span>
                <span className="text-muted-foreground truncate text-xs">{`${user.resident_lastname}, ${user.resident_firstname}`}</span>
            </div>
        </>
    ) : null);

}
