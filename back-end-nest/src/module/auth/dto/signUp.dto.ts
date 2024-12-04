import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsArray, IsEnum } from 'class-validator';
import { IUser } from '../interface/user.interface';
import { ERole } from '../enum/role.enum';

export class SignUpDto implements IUser {


    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'El Email es obligatorio' })
    @IsEmail({}, { message: 'Formato de email invalido' })
    email: string;

    @IsNotEmpty({ message: 'La Contraseña es obligatoria' })
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres. '})
    password: string;

    @IsOptional()
    @IsArray()
    @IsEnum(ERole, { each: true, message: 'Rol invalido'})
    role?: ERole[];

}