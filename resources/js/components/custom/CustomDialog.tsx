import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CustomFormField } from '@/types';
import React from 'react';
import { Toaster } from 'sonner';

interface CustomDialogProps {
    title: string;
    subtitle?: string;
    button?: React.ReactNode;
    children: React.ReactNode;
    trigger: React.ReactNode;
    width?: string;
    height?: string;
    subTitleClassName?: string
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
    fields?: CustomFormField
}

const CustomDialog = ({ title, subtitle, children, trigger, button, width = 'w-5xl', subTitleClassName, height = 'max-h-130', onSubmit, fields }: CustomDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className={`${width}`}>
                <DialogHeader className="flex-row items-center justify-start rounded-t-md bg-s3 p-2 -m-6.5">
                    <DialogTitle className=" text-white pl-4">{title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className='flex flex-col gap-y-7'>
                    <div className={`scroll-invisible overflow-y-auto flex flex-col gap-3 mt-4 ${height}`}>
                        <h1 className={subTitleClassName}>{subtitle}</h1>
                        {children}
                    </div>
                    <DialogFooter>
                        {button}
                    </DialogFooter>
                </form>
            <Toaster richColors position='bottom-left' />
            </DialogContent>
        </Dialog >
    );
};

export default CustomDialog;
