import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IProveedores } from '../interface/proveedores.interface';
import { User } from 'src/module/auth/schema/auth.schema';

@Schema()
export class Proveedores extends Document implements IProveedores{
    @Prop({required: true})
    nombre_proveedor: string;

    @Prop({required: true})
    email_proveedor: string;

    @Prop({required: true})
    celular_proveedor: string;

    @Prop({default: true})
    activo_proveedor?: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}
export const ProveedoresSchema = SchemaFactory.createForClass(Proveedores);

