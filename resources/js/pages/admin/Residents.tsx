import { CustomDataTable } from '@/components/custom/CustomDataTable';
import CustomDialog from '@/components/custom/CustomDialog';
import CustomForm from '@/components/custom/CustomForm';
import { Button } from '@/components/ui/button';
import { addResidentDemographic, addResidentName, residentAddress } from '@/data/FormFields';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import SearchTableCell from '../../../assets/SearchBlue.png';

type Resident = {
    id: number;
    precinctId: string;
    residentName: string;
    residentGender: string;
    residentBirthday: string;
    residentStatus: string;
};

const ResidentsData: Resident[] = [
    {
        id: 1,
        precinctId: 'INV001',
        residentName: 'Reignear Magallanes',
        residentGender: 'Male',
        residentBirthday: '1998-01-01',
        residentStatus: 'Active',
    },
    {
        id: 2,
        precinctId: 'INV002',
        residentName: 'Gester Lorica',
        residentGender: 'Male',
        residentBirthday: '1892-01-01',
        residentStatus: 'Active',
    },
    {
        id: 3,
        precinctId: 'INV003',
        residentName: 'Mark Jefferson Saldana',
        residentGender: 'Male',
        residentBirthday: '1789-01-01',
        residentStatus: 'Active',
    },
    {
        id: 4,
        precinctId: 'INV004',
        residentName: 'Juan Dela Cruz',
        residentGender: 'Male',
        residentBirthday: '1980-05-20',
        residentStatus: 'Inactive',
    },
    {
        id: 5,
        precinctId: 'INV005',
        residentName: 'Maria Clara',
        residentGender: 'Female',
        residentBirthday: '1975-03-10',
        residentStatus: 'Active',
    },
    {
        id: 6,
        precinctId: 'INV005',
        residentName: 'Maria Clara',
        residentGender: 'Female',
        residentBirthday: '1975-03-10',
        residentStatus: 'Active',
    },
];

const columns: ColumnDef<Resident>[] = [
    {
        accessorKey: 'precinctId',
        header: () => <div className="text-center">Precinct ID</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue('precinctId')}</div>,
    },
    {
        accessorKey: 'residentName',
        header: ({ column }) => (
            <div className="text-center">
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Name <ArrowUpDown />
                </Button>
            </div>
        ),
        cell: ({ row }) => <div className="text-center capitalize">{row.getValue('residentName')}</div>,
    },
    {
        accessorKey: 'residentGender',
        header: () => <div className="text-center">Gender</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue('residentGender')}</div>,
    },
    {
        accessorKey: 'residentBirthday',
        header: () => <div className="text-center">Birthday</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue('residentBirthday')}</div>,
    },
    {
        accessorKey: 'residentStatus',
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue('residentStatus')}</div>,
    },
    {
        id: 'actions',
        header: () => <div className="text-center">Action</div>,
        cell: () => (
            <div className="flex justify-center">
                <Button variant="search" className="rounded-sm">
                    <div className="flex flex-row items-center gap-2">
                        <img src={SearchTableCell} alt="Search Icon" />
                        <p className="text-blue-500">View</p>
                    </div>
                </Button>
            </div>
        ),
    },
];

const renderAddResidentForm = () => {
    return (
        <>
            <div className="mt-5">
                <CustomForm fields={addResidentName} className="grid grid-cols-4 gap-x-4" />
            </div>
            <div className="mt-5">
                <CustomForm fields={addResidentDemographic} className="grid grid-cols-4 gap-x-4" />
            </div>
            <div className="mt-5">
                <CustomForm fields={residentAddress} className="grid grid-cols-4 gap-x-4" />
            </div>
        </>
    );
};

const Residents = () => {
    return (
        <AdminLayout>
            <div className="h-full w-full p-2 pt-5">
                <div className="flex flex-row items-center justify-end pr-2">
                    <CustomDialog
                        title="Add resident"
                        trigger={
                            <Button className="mr-1 w-3xs rounded-full" variant="primary">
                                Add Resident
                            </Button>
                        }
                        contentClassName="mt-5"
                        button={
                            <Button variant="primary" className="w-56">
                                Add
                            </Button>
                        }
                    >
                        {renderAddResidentForm()}
                    </CustomDialog>
                </div>
                <div className="mt-4">
                    <CustomDataTable columns={columns} data={ResidentsData} filterColumn="residentName" searchPlaceHolder="Search resident's name" />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Residents;
