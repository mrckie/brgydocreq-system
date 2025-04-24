import CustomDialog from '@/components/custom/CustomDialog';
import { Button } from '@/components/ui/button';
import UserSettingsLayout from '@/layouts/user/UserSettingsLayout';
import { Check, Clock, FileCheck2, FileSearch, FileText, Info, MoveRight, ShoppingCart } from 'lucide-react';
import barangayCertificate from '../../../../assets/barangay-clearance.png';

const SampleData = {
    name: 'Reignear Magallanes',
    document: 'Barangay Clearance',
    purpose: 'to serve and to protect',
    payment: 120,
    date: '2023-10-01',
    status: 'rejected',
    attachment: barangayCertificate,
};

const DocumentRequest = () => {
    return (
        <UserSettingsLayout title="Document Request">
            <div className="max-h-[530px] w-full">
                <div className="max-h-full w-full rounded-2xl border-2">
                    <div className="flex min-h-12 w-full items-center gap-x-5 rounded-t-2xl bg-linear-to-r from-teal-500 to-green-500 pl-5">
                        <Info className="h-5 w-5 rounded-full bg-blue-500" fill="blue" stroke="white" />
                        <h1>Barangay Document Tracking</h1>
                    </div>
                    <div className="mb-2 flex h-full w-[full] flex-col items-center justify-center gap-y-4 bg-white p-2">
                        <div className="min-w-4/5">
                            <div className="flex h-full w-[full] flex-col items-center justify-center rounded-b-2xl bg-white p-2">
                                <div className="min-w-4/5">
                                    <div className="flex w-full flex-row items-center justify-evenly p-2">
                                        {[
                                            { icon: <FileSearch />, label: 'Preview', status: 'Under review'.toLowerCase() },
                                            {
                                                icon: SampleData.status === 'rejected' ? <FileCheck2 /> : <FileCheck2 />,
                                                label: SampleData.status === 'rejected' ? 'Rejected' : 'Approved',
                                                status: SampleData.status === 'rejected' ? 'Rejected'.toLowerCase() : 'Approved'.toLowerCase(),
                                            },
                                            { icon: <Clock />, label: 'Processing', status: 'Processing'.toLowerCase() },
                                            { icon: <ShoppingCart />, label: 'For pickup', status: 'For pickup'.toLowerCase() },
                                            { icon: <Check />, label: 'Claimed', status: 'Claimed'.toLowerCase() },
                                        ].map((step, index, arr) => (
                                            <div key={step.label} className="flex flex-row items-center">
                                                <div className="flex flex-col items-center justify-center gap-y-2">
                                                    <div
                                                        className={`flex h-13 w-13 items-center justify-center rounded-full border-3 ${
                                                            SampleData.status === step.status
                                                                ? step.status === 'rejected'
                                                                    ? 'border-red-500 text-red-500'
                                                                    : 'border-green-500 text-green-500'
                                                                : arr.findIndex((s) => s.status === SampleData.status) > index
                                                                  ? 'border-green-500 text-green-500'
                                                                  : 'border-gray-300 text-gray-500'
                                                        }`}
                                                    >
                                                        {step.icon}
                                                    </div>
                                                    <h1
                                                        className={`text-sm ${
                                                            SampleData.status === step.status
                                                                ? step.status === 'rejected'
                                                                    ? 'text-red-500'
                                                                    : 'text-green-500'
                                                                : arr.findIndex((s) => s.status === SampleData.status) > index
                                                                  ? 'text-green-500'
                                                                  : 'text-gray-500'
                                                        }`}
                                                    >
                                                        {step.label}
                                                    </h1>
                                                </div>
                                                {index < arr.length - 1 && (
                                                    <MoveRight
                                                        width={120}
                                                        fontSizeAdjust={50}
                                                        className={`mb-7 ${
                                                            arr.findIndex((s) => s.status === SampleData.status) > index
                                                                ? 'text-green-500'
                                                                : 'text-gray-500'
                                                        }`}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 w-full rounded-2xl border-2 shadow-xl shadow-gray-200">
                                <h1 className="ml-10 p-4 text-xl font-bold">Name: {SampleData.name}</h1>
                                <div className="ml-10 flex flex-row items-center gap-x-10 p-4">
                                    <FileText size={120} fill="white" stroke="#18333C" />
                                    <div className="flex flex-col items-start gap-y-1">
                                        <h1 className="font-bold">{SampleData.document}</h1>
                                        <p>Purpose: {SampleData.purpose}</p>
                                        <p>Payment: {SampleData.payment}</p>
                                    </div>
                                </div>
                                <div className="ml-10 flex max-w-full flex-row justify-between p-4">
                                    <p>{SampleData.date}</p>
                                    <CustomDialog
                                        classname="flex flex-col items-center justify-center"
                                        trigger={<Button variant="plain">Attachment</Button>}
                                        children={<img src={SampleData.attachment} className="flex h-max w-max items-center justify-center" alt="" />}
                                        title="Attachment"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-10">
                            <Button variant="primary" className="w-40 disabled:opacity-50" disabled={SampleData.status !== 'rejected'}>
                                Resubmit
                            </Button>
                            <Button variant="destructive" className="w-40">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </UserSettingsLayout>
    );
};

export default DocumentRequest;
