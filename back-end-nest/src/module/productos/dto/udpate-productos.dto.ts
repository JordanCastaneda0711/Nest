import { IsEmpty, IsOptional, IsString, IsBoolean, IsNumber, IsArray } from "class-validator";
import { Clientes } from "src/module/clientes/schema/clientes.schema";
import { Proveedores } from "src/module/proveedores/schema/proveedores.schema";
import { Types } from "mongoose";
import { User } from 'src/module/auth/schema/auth.schema';

export class UpdateProductosDto {

    @IsOptional() 
    @IsString()
    nombre_producto?: string;

    @IsOptional() 
    @IsNumber()
    cantidad?: number;

    @IsOptional() 
    @IsNumber()
    precio?: number;

    @IsOptional() 
    @IsArray() 
    proveedor?: Proveedores[]; 
    @IsOptional()
    @IsArray()
    cliente?: Clientes[];

    @IsOptional() 
    @IsBoolean()
    activo?: boolean;
    
    @IsEmpty({ message: 'You can not pass user id' })
    user?: User;
}
