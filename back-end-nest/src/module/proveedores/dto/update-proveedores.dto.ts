import { IsEmpty, IsNotEmpty, IsString, IsBoolean} from "class-validator";
import { User } from 'src/module/auth/schema/auth.schema';


export class UpdateProveedoresDto{
    @IsNotEmpty()
    @IsString()
    nombre_proveedor?: string;

    @IsNotEmpty()
    @IsString()
    email_proveedor?: string;

    @IsNotEmpty()
    @IsString()
    celular_proveedor?: string;

    @IsBoolean()
    activo_proveedor?: boolean;

    @IsEmpty({ message: 'You can not pass user id' })
    user?: User;
}