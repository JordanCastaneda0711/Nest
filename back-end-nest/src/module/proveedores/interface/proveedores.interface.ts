import { User } from 'src/module/auth/schema/auth.schema';

export interface IProveedores{
    id?: string;
    nombre_proveedor: string;
    email_proveedor: string;
    celular_proveedor: string;
    activo_proveedor?: boolean;
    user: User;
}