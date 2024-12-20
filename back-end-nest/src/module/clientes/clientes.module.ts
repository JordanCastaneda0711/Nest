import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientesService } from './service/clientes.service';
import { ClientesController } from './controller/clientes.controller';
import { Clientes, ClientesSchema } from './schema/clientes.schema';
import { AuthModule } from '../auth/auth.module';


@Module({  

    imports : [    
        AuthModule,
        MongooseModule.forFeature([{

        name: Clientes.name,
        schema: ClientesSchema,
    }])],

    controllers: [ClientesController],
    providers: [ClientesService],
    exports: [ClientesService]

})

export class ClientesModule {}
