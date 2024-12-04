import { IUser } from '../interface/user.interface';
import { IsNotEmpty, IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class LogInDto implements IUser {
    
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
    name: string;
    
    @IsOptional()
    @IsEmail({}, { message: 'Formato de email invalido. '})
    @IsNotEmpty({ message: 'El email no puede estar vacio' })
    email: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'La contraseña no puede estar vacia' })
    @MinLength(6, { message: 'La contraseña no puede estar vacia' })
    password: string;
}   