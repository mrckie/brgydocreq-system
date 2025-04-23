import CustomDialog from '@/components/custom/CustomDialog';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { DocumentCustomCard } from '@/components/custom/CustomCard';
import { useForm, usePage } from '@inertiajs/react';
import { Document, SharedData } from '@/types';
import { LoaderCircleIcon, PlusCircle } from 'lucide-react';
import CustomForm from '@/components/custom/CustomFormFields';
import { fetchUpdateFirstHalve } from '@/data/admin/FetchUpdateDocumentFields'
import { fetchUpdateSecondHalve } from '@/data/admin/FetchUpdateDocumentFields'
import { addFirstHalve } from '@/data/admin/AddDocumentFields'
import { addSecondHalve } from '@/data/admin/AddDocumentFields'
import { FormEventHandler } from 'react';
import { useInitials } from '@/hooks/UseInitials';
import DefaultDocPic from '../../../assets/default_documentpic.svg'

export default function Documents() {

    const { documents } = usePage<SharedData>().props;


    // update and fetch document
    const { data: updateData, setData: updateSetData, put: updatePut, processing: updateProcessing, errors: updateErrors } = useForm<Required<Document>>({
        document_id: 0,
        status_id: null,
        document_name: '',
        description: '',
        document_photopath: '',
        price: '',
    })

    const updateSubmit: FormEventHandler = (e) => {
        e.preventDefault;
        updatePut(route('admin.documents.update', updateData.document_id), {
            onError: (errors) => {
                console.error('Form submission failed. Validation errors:');
                Object.entries(errors).forEach(([field, message]) => {
                    console.error(`Field: ${field}, Error: ${message}`);
                });
            },
        })
    }

    const populateDialog = (document: Document) => {
        updateSetData({
            'document_id': document.document_id,
            'document_name': document.document_name,
            'description': document.description,
            'price': document.price,
            'status_id': document.status_id,
            'document_photopath': document.document_photopath
        })
    }

    //add document

    const { data: addData, setData: addSetData, post: addPost, processing: addProcessing, errors: addErrors } = useForm<Omit<Document, 'document_id'>>({
        status_id: null,
        document_name: '',
        description: '',
        document_photopath: '',
        price: '',
    })

    const addSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        addPost(route('admin.documents.store'), {
            onError: (errors) => {
                console.error('Form submission failed. Validation errors:');
                Object.entries(errors).forEach(([field, message]) => {
                    console.error(`Field: ${field}, Error: ${message}`);
                });
            },
        })
    }

    return (
        <AdminLayout>
            <div className='flex justify-end'>
                <CustomDialog
                    title='Add Document'
                    onSubmit={addSubmit}
                    trigger={
                        <Button className='w-1/7'><PlusCircle />Add Document</Button>
                    }
                    button={
                        <Button disabled={addProcessing}>{addProcessing && <LoaderCircleIcon className="h-4 w-4 animate-spin" />} Submit</Button>
                    }
                    children={
                        <>
                            <CustomForm fields={addFirstHalve(addData, addSetData, addErrors)} className='grid grid-cols-2 gap-x-10' />
                            <CustomForm fields={addSecondHalve(addData, addSetData, addErrors)} className='grid grid-cols-1' />
                        </>
                    } />
            </div>
            <div className='grid grid-cols-3 gap-7'>

                {documents.map((document, index) => (
                    <CustomDialog
                        onSubmit={updateSubmit}
                        key={index}
                        title={document.document_name}
                        button={<Button disabled={updateProcessing} variant="primary">{updateProcessing && <LoaderCircleIcon className="h-4 w-4 animate-spin" />} Save</Button>}
                        trigger={
                            <DocumentCustomCard
                                image={document.document_photopath ?? DefaultDocPic}
                                alt={document.document_name}
                                title={document.document_name}
                                content={document.description}
                                onClick={() => (populateDialog(document))}
                            />
                        }
                        children={
                            <>
                                <input type="text" hidden defaultValue={updateData.document_id} />
                                <CustomForm className='grid grid-cols-2 gap-x-10' fields={fetchUpdateFirstHalve(updateData, updateSetData, updateErrors)} />
                                <CustomForm className='grid grid-cols-1' fields={fetchUpdateSecondHalve(updateData, updateSetData, updateErrors)} />
                            </>

                        }
                    />
                ))}

            </div>

        </AdminLayout>
    );
}
