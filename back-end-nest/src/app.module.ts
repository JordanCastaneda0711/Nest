import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProveedoresModule } from './module/proveedores/proveedores.module';
import { AuthModule } from './module/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ClientesModule } from './module/clientes/clientes.module';
import { ProductosModule } from './module/productos/productos.module';



@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 5000,
        limit: 1,
      },
    ]),
    MongooseModule.forRoot('mongodb+srv://Jordan:1010960986@cluster0.e7x9a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    ProveedoresModule,
    AuthModule,
    ClientesModule,
    ProductosModule,
  ],
  
})
export class AppModule {}
