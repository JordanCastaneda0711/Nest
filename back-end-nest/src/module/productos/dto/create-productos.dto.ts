import { IsEmpty, IsNotEmpty, IsString, IsNumber, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { Clientes } from 'src/module/clientes/schema/clientes.schema';
import { User } from 'src/module/auth/schema/auth.schema';


export class CreateProductoDto {
    @IsString()
    nombre_producto: string;

    @IsNumber()
    cantidad: number;

    @IsNumber()
    precio: number;

    // El campo de proveedores es opcional cuando creamos un producto
    @IsOptional()
    @IsArray()
    proveedor?: string[]; // Es un array de ObjectIds que hace referencia a los proveedores

    @IsOptional()
    @IsArray()
    cliente?: string[];

    @IsOptional()
    activo?: boolean;

    @IsEmpty({ message: 'You can not pass user id' })
    user: User;
}
