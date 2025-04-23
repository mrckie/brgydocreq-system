import { useInitials } from '@/hooks/UseInitials';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const CustomProfilePic = () => {
	const { auth } = usePage<SharedData>().props;
	const getInitials = useInitials();

	return (
		<div className='py-7 flex flex-col justify-center items-center gap-y-2'>
			<Avatar className="size-30 overflow-hidden rounded-full">
				<AvatarImage src={auth.user.user_photopath} alt={auth.user.username} />
				<AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white text-4xl">
					{getInitials(auth.user.username)}
				</AvatarFallback>
			</Avatar>
			<div className="flex flex-col justify-center items-center">
				<span className="truncate font-medium">{auth.user.username}</span>
				<span className="text-muted-foreground truncate text-sm">{auth.user.user_email}</span>
			</div>
		</div>

	)
}

export default CustomProfilePic