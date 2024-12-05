import { User } from 'src/module/auth/schema/auth.schema';

export enum Categoria {
    AVENTURA = 'Aventura',
    CLASICOS = 'Clasicos',
    CRIMEN = 'Crimen',
    GORE = 'Gore',
}

export interface IBook {
    titulo: string;
    descripcion: string,
    autor: string,
    precio: number,
    categoria: Categoria,
    user: User;
}