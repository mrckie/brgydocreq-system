import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import InputError from './InputError';
import CustomSelect from './CustomSelect';
import { DatePicker } from '../ui/date-picker';
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
                        value={field.value}
                        tabIndex={field.tabIndex}
                        disabled={field.disabled}
                        onChange={field.onChange}
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
                        className="disabled:text-black disabled:border-shamrock-green"
                        onChange={field.onChange}
                        {...field.additionalProps}
                    />
                );
            case 'select':
                return (
                    <CustomSelect
                        placeholder={field.placeholder}
                        onChange={field.onChange ?? (() => { })}
                        items={field.selectItems ?? []}
                        value={field.value ?? null}
                        {...field.additionalProps}
                    />
                );
            case 'link':
                return <TextLink className="text-sm">{field.value}</TextLink>;
            case 'file':
                return (
                    <Input
                        id={field.id}
                        type="file"
                        tabIndex={field.tabIndex}
                        disabled={field.disabled}
                        onChange={field.onChange}
                        accept={field.accept}
                        {...field.additionalProps}
                    />
                );
            default:
                if (field.id === 'price') {
                    return (
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">₱</span>
                            <Input
                                type="text"
                                id={field.id}
                                placeholder="0.00"
                                value={field.value}
                                tabIndex={field.tabIndex}
                                disabled={field.disabled}
                                onChange={field.onChange}
                                className="pl-7 disabled:text-black disabled:border-shamrock-green"
                                {...field.additionalProps}
                            />
                        </div>
                    );
                }

                return (
                    <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value}
                        autoFocus={field.autofocus}
                        disabled={field.disabled}
                        autoComplete={field.autoComplete}
                        tabIndex={field.tabIndex}
                        onChange={field.onChange}
                        className="disabled:text-black disabled:border-shamrock-green"
                        {...field.additionalProps}
                    />
                );

        }
    };

    return (
        <div className="flex flex-col">
            {title && <h1 className="pb-2 font-normal">{title}</h1>}
            <div className={className}>
                {fields.map((field, index) => (
                    <div key={index} className="pb-3">
                        {field.label && (
                            <Label htmlFor={field.id} className="text-xs">
                                {field.label}
                            </Label>
                        )}
                        {renderField(field)}
                        {field.errorMessage && <InputError message={field.errorMessage} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomForm;