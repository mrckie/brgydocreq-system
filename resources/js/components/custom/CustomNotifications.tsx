import approved from '../../../assets/notif-approved.svg';
import cancelled from '../../../assets/notif-cancelled.svg';
import claimed from '../../../assets/notif-claimed.svg';
import forPickUp from '../../../assets/notif-for-pickup.svg';
import processing from '../../../assets/notif-processing.svg';
import rejected from '../../../assets/notif-rejected.svg';
import underReview from '../../../assets/notif-under-review.svg';

interface CustomNotificationsProps {
    Icon?: string;
    title?: string;
    description?: string;
    time?: string;
    type?: 'rejected' | 'claimed' | 'under review' | 'processing' | 'For pickup' | 'approved' | 'cancelled';
}

const notificationColors: Record<string, { bgFirstColor: string; bgColor: string; textColor: string; Icon: string }> = {
    approved: { bgFirstColor: '#0C9', bgColor: 'bg-green-500/10', textColor: 'text-green-700', Icon: approved },
    rejected: { bgFirstColor: '#EB5757', bgColor: 'bg-red-500/10', textColor: 'text-red-700', Icon: rejected },
    claimed: { bgFirstColor: '#1591EA', bgColor: 'bg-blue-500/10', textColor: 'text-blue-500', Icon: claimed },
    'under review': { bgFirstColor: '#FFD700', bgColor: 'bg-yellow-500/10', textColor: 'text-yellow-400', Icon: underReview },
    processing: { bgFirstColor: '#BF8BFF', bgColor: 'bg-violet-500/10', textColor: 'text-processing-700', Icon: processing },
    'for pickup': { bgFirstColor: '#FFA500', bgColor: 'bg-orange-500/10', textColor: 'text-orange-400', Icon: forPickUp },
    cancelled: { bgFirstColor: '#808080', bgColor: 'bg-gray-500/10', textColor: 'text-gray-700', Icon: cancelled },
};

const CustomNotifications = ({ Icon, title, description, time, type = 'approved' }: CustomNotificationsProps) => {
    const { bgFirstColor, bgColor, textColor, Icon: defaultIcon } = notificationColors[type] || {};
    return (
        <div className="w-full">
            <div className={`flex w-full items-center gap-3 overflow-hidden rounded-r-lg border ${bgColor}`}>
                <div className="min-h-24 w-4 rounded-r-lg" style={{ backgroundColor: bgFirstColor }}></div>
                <img src={Icon || defaultIcon} alt={type} />
                <div className="flex flex-col">
                    <h3 className={`text-sm font-semibold ${textColor}`}>{title || type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                    <p className="text-sm text-gray-700">{description || 'No description provided.'}</p>
                    <p className="mt-1 text-xs text-gray-500">{time || 'Just now'}</p>
                </div>
            </div>
        </div>
    );
};

export default CustomNotifications;
