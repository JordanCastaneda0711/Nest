import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import { Model } from 'mongoose';
import { CreateDtoBook } from './dto/create-book.dto';
import { User } from '../auth/schema/auth.schema';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>){}

    //Metodo para traer todos los libros
    async findAll(): Promise<Book[]> {
        const books = await this.bookModel.find().exec();
        return books;
    }

    //Metodo para crear un libro
    async createBook(createDtoOBook: CreateDtoBook, user: User): Promise<Book> {
        const data = Object.assign(createDtoOBook, { user: user._id });
        const book = await this.bookModel.create(data);
        return book;
    }

    //Metodo para traer un libro
    async findByIdBook(id: string): Promise<Book> {
        const book = await this.bookModel.findById(id).exec();
        return book;
    }
}