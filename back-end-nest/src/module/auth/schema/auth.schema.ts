import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from '../interface/user.interface';
import { Document } from 'mongoose';
import { ERole } from '../enum/role.enum';
import { IsEmail, IsNotEmpty, IsString, IsArray, isString } from 'class-validator';

@Schema({ timestamps: true})
export class User extends Document implements IUser {
    @Prop({ required: true})
    @IsNotEmpty()
    name: string;

    @Prop({ unique: [true, 'Duplicate email entered']})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Prop({ required: true })
    @IsString()
    password: string;

    @Prop({
        type: [{ type: String, enum: ERole }],
        default: [ERole.USER],
    })
    @IsArray()
    role: ERole[];
}

export const UserSchema = SchemaFactory.createForClass(User);