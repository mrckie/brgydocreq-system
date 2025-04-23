import CustomNotifications from '@/components/custom/CustomNotifications';
import UserSettingsLayout from '@/layouts/user/UserSettingsLayout';

const NotificationsData = [
    {
        type: 'approved',
        title: 'Approved',
        description: 'Your request has been approved successfully.',
        time: '1d',
    },
    {
        type: 'rejected',
        title: 'Rejected',
        description: 'Your request has been rejected.',
        time: '2d',
    },
    {
        type: 'under review',
        title: 'Under Review',
        description: 'Your request is pending.',
        time: '3d',
    },
    {
        type: 'cancelled',
        title: 'Cancelled',
        description: 'Your request has been approved successfully.',
        time: '1d',
    },
    {
        type: 'claimed',
        title: 'Claimed',
        description: 'Your request has been rejected.',
        time: '2d',
    },
    {
        type: 'processing',
        title: 'Processing',
        description: 'Your request is pending.',
        time: '3d',
    },
    {
        type: 'for pickup',
        title: 'For pickup',
        description: 'Your request is pending.',
        time: '3d',
    },
];

const Notifications = () => {
    return (
        <UserSettingsLayout title="Notifications">
            <div className="flex max-h-[530px] w-full flex-col gap-y-1 overflow-y-auto pr-2">
                {NotificationsData.map((notification) => (
                    <CustomNotifications
                        type={notification.type}
                        title={notification.title}
                        description={notification.description}
                        time={notification.time}
                    />
                ))}
            </div>
        </UserSettingsLayout>
    );
};

export default Notifications;
