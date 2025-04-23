import { LucideIcon } from 'lucide-react';
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
    admins: AdminFetch[];
    residents: ResidentFetch[];
    roles: Role[];
    documents: Document[];
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
export interface Admin {
    admin_id: string;
    admin_username: string;
    admin_email: string;
    admin_photopath?: string;
    admin_role: string;
    [key: string]: unknown; // This allows for additional properties...
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

export interface Document {
    document_id: number;
    status_id: number | null;
    document_name: string;
    description: string;
    price: string;
    document_photopath: string | null;
}

export interface AdminFetch {
    admin_id: number;
    admin_username: string;
    admin_email: string;
    admin_photopath: string;
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

export interface CustomFormField {
    id?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string | number | Date | null;
    tabIndex?: number;
    autoComplete?: string;
    name?: string;
    onChange?: (value: string | number | Date | null) => void;
    errorMessage?: string;
    autofocus?: boolean;
    options?: { label: string; value: string }[];
    additionalProps?: Record<string, any>;
    selectItems?: { value: number; label: string }[];
    disabled?: boolean;
}

export interface InviteForm {
    email: string;
    role_id: number | null;
}
