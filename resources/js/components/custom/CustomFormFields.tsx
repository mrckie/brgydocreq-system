import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import InputError from './InputError';
import CustomSelect from './CustomSelect';
import { DatePicker } from '../ui/date-picker';
import { Input } from '../ui/input';
import TextLink from './CustomTextLink';
import { CustomFormField } from '@/types';

interface CustomFormProps {
    fields: CustomFormField[];
    title?: string;
    className?: string;
}


const CustomForm = ({ fields, className, title }: CustomFormProps) => {
    const renderField = (field: CustomFormField) => {
        switch (field.type) {
            case 'textarea':
                return (
                    <Textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        value={field.value as string}
                        tabIndex={field.tabIndex}
                        disabled={field.disabled}
                        onChange={(e) => field.onChange?.(e.target.value)}
                        {...field.additionalProps}
                    />
                );
            case 'date':
                return (
                    <DatePicker
                        id={field.id}
                        tabIndex={field.tabIndex}
                        value={field.value ? new Date(field.value) : null}
                        disabled={field.disabled}
                        className={`
                            disabled:text-black disabled:border-shamrock-green`}
                        {...field.additionalProps}
                        onChange={(date) => field.onChange?.(date)}
                        {...field.additionalProps}

                    />
                );
            case 'select':
                return (
                    <CustomSelect
                        placeholder={field.placeholder}
                        onChange={(value: number) => field.onChange?.(value)}
                        items={field.selectItems || []}
                        {...field.additionalProps}
                        value={field.value as number}
                    />
                );
            case 'link':
                return (
                    <TextLink className='text-sm'>
                        {field.value as string}
                    </TextLink >
                );

            default:
                return (
                    <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value as string || ''}
                        autoFocus={field.autofocus}
                        disabled={field.disabled}
                        autoComplete={field.autoComplete}
                        tabIndex={field.tabIndex}
                        onChange={(e) => field.onChange?.(e.target.value)}
                        className={`
                            disabled:text-black disabled:border-shamrock-green`}
                        {...field.additionalProps}
                    />
                );
        }
    };

    return (
        <div className="flex flex-col">
            <h1 className="pb-2 font-normal">{title}</h1>
            <div className={className}>
                {fields.map((field, index) => (
                    <div key={index} className="pb-3">
                        <Label htmlFor={field.id} className="text-xs">
                            {field.label}
                        </Label>
                        {renderField(field)}
                        <InputError message={field.errorMessage} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomForm;
export type { CustomFormField };