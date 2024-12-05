import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/auth.schema';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LogInDto } from './dto/logIn.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}


    //Metodo de registro para el usuario
    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { password, ...userData } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await this.userModel.create({
            ...userData,
            password: hashedPassword,
        });
        
        const token = this.jwtService.sign({
            id: newUser.id,
            name: newUser.name,
        });

        return { token }
    } catch (error) {
        throw new UnauthorizedException('Error al registrar el usuario. Intentalo de nuevo');
    }
    }

    //Metodo de inicio de sesion para el usuario
    async logIn(logInDto: LogInDto): Promise<{ token: string }> {
        const { email, password } = logInDto;

        const user = await this.userModel.findOne({ email }).exec();

        if(!user) {
            throw new UnauthorizedException('Email o contraseña invalidos')
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if(!isPasswordMatched) {
            throw new UnauthorizedException('Email o contraseña invalidos')
        }

        const payload = { id: user.id, name: user.name };
        const token = this.jwtService.sign(payload);

        return { token };
    }
}


