import { LucideIcon } from 'lucide-react';
import { ChangeEvent } from 'react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: UserForm;
    admin: Admin;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    auth: Auth;
    admins: AdminForm[];
    residents: ResidentFetch[];
    roles: Role[];
    documents: DocumentForm[];
    puroks: Purok[];
    status: Status[];
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface UserForm {
    user_id: number;
    username: string;
    user_email: string;
    user_phonenum: string;
    user_photopath: string;
    resident_firstname: string;
    resident_middlename: string;
    resident_lastname: string;
    resident_suffix: string | null;
    resident_birthdate: string;
    resident_gender: string;
    resident_precinct: string;
    resident_householdnum: string;
    resident_purok: string;
}

export interface Role {
    role_id: number;
    role_name: string;
}

export interface Purok {
    address_id: number;
    purok: string;
}

export interface Status {
    status_id: number;
    status_name: string;
}

export interface DocumentForm {
    document_id: number;
    status_id: number | null;
    document_name: string;
    description: string;
    price: string;
    document_photopath: File | null;
}

export interface AdminForm {
    admin_id: number;
    admin_username: string;
    admin_email: string;
    admin_photopath: File | null;
    admin_roleid: number | null;
    admin_phonenum: string;
    admin_role: string;
    officer_firstname: string;
    officer_middlename: string;
    officer_lastname: string;
    officer_suffix: string | null;
    officer_birthdate: string;
    officer_precinct: string;
    officer_householdnum: string;
    officer_position: string;
    officer_gender: string;
    officer_purok: string;
    officer_purokid: number | null;
}

export interface ResidentFetch {
    resident_id: number;
    resident_firstname: string;
    resident_middlename: string;
    resident_lastname: string;
    resident_suffix: string | null;
    resident_birthdate: string;
    resident_gender: string;
    resident_precinct: string;
    resident_householdnum: string;
    resident_status: string;
    resident_purok: string;
    resident_statusid: number | null;
    resident_purokid: number | null;
}

export interface AdminRegisterForm {
    officer_firstname: string;
    officer_middlename: string;
    officer_lastname: string;
    officer_suffix: string;
    officer_birthdate: Date | null;
    officer_householdnum: string;
    admin_email: string;
    admin_phonenum: string;
    admin_username: string;
    admin_role: string;
    admin_password: string;
    admin_password_confirmation: string;
    [key: string]: any;
}

export interface ResidentVerificationForm {
    resident_firstname: string;
    resident_middlename: string;
    resident_lastname: string;
    resident_suffix: string;
    resident_birthdate: string;
    resident_householdnum: string;
    resident_birthdate: Date | null;
    email: string;
    phone_number: string;
}

export interface InviteForm {
    email: string;
    role_id: number | null;
}

// Base interface for common properties
interface BaseFormField {
    id?: string;
    label?: string;
    tabIndex?: number;
    disabled?: boolean;
    errorMessage?: string;
    additionalProps?: Record<string, any>;
}

// Specific interfaces for each field type
interface TextField extends BaseFormField {
    type: 'text' | 'email' | 'password' | 'number';
    placeholder?: string;
    value?: string | number;
    autoComplete?: string;
    autofocus?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface TextareaField extends BaseFormField {
    type: 'textarea';
    placeholder?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

interface FileField extends BaseFormField {
    type: 'file';
    accept?: string;
    value?: File | null;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface SelectField extends BaseFormField {
    type: 'select';
    placeholder?: string;
    value?: number | null;
    selectItems?: { value: number; label: string }[];
    onChange?: (value: number) => void;
}

interface DateField extends BaseFormField {
    type: 'date';
    value?: string | Date | null;
    onChange?: (date: Date | null) => void;
}

interface LinkField extends BaseFormField {
    type: 'link';
    value?: string;
    onChange?: never; // No onChange for links
}

// Discriminated union
export type CustomFormField = TextField | TextareaField | FileField | SelectField | DateField | LinkField;
