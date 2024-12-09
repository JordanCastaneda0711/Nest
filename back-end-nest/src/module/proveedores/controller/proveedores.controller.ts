import { 
    Controller, 
    Post, 
    Body, 
    Delete, 
    Param, 
    NotFoundException, 
    Get, 
    UseGuards,
    Put,
    Patch
} from '@nestjs/common';

import { ProveedoresServices } from '../service/proveedores.service';
import { CreateProveedoresDto } from '../dto/create-proveedores.dto';
import { UpdateProveedoresDto } from '../dto/update-proveedores.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../auth/decorators/role.decorator';
import { ERole } from '../../auth/enum/role.enum';
import { RolesGuards } from '../../auth/guards/role.guard';
import { Proveedores } from '../schema/proveedores.schema';

// Importacion necesaria para documentar en swagger para los endpoints
import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('PROVEEDORES') // Etiqueta para agrupar endpoints en la documentacion
@Controller('proveedores') // Ruta base
export class ProveedoresController{


    constructor(private readonly proveedoresServies: ProveedoresServices)
    {

    }
    


    //Controlador para crear el Proveedor
    @Post()
    @Roles(ERole.MODERATOR, ERole.ADMIN, ERole.USER)
    @UseGuards(AuthGuard(), RolesGuards)
    @ApiOperation({summary: 'Crear un nuevo proveedor'}) 
    @ApiResponse({status: 201, description: 'El proveedor ha sido creado'}) 
    @ApiResponse({status: 400, description: 'Solicitud incorrecta'})
    @ApiBody({
        description: 'Cuerpo de solicitud para crear un nuevo proveedor',
        examples:{
            example:{
                summary: 'Ejemplo de creacion',
                value:{
                    nombre_proveedor: 'Nombre__Proveedor',
                    email_proveedor: 'proveedor@gmail.com',
                    celular_proveedor: '1234567890'
                }
            }
        }
    })
    async craete(@Body() createProveedorDto: CreateProveedoresDto): Promise<Proveedores>{
        return  this.proveedoresServies.createProveedor(createProveedorDto);
    }


    //Controlador para desactivar
    @Put('deactivate/:id')
    @Roles(ERole.MODERATOR, ERole.ADMIN, ERole.USER)
    @UseGuards(AuthGuard(), RolesGuards)
    @ApiOperation({summary:'Desctivar un proveedor'})
    @ApiResponse({status: 204, description: 'Proveedor desactivado'})
    @ApiResponse({status:400, description:'No se encuentra el proveedor'})
    @ApiResponse({status:404, description:'Solicitud incorrecta'})
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Id del proveedor que desea desactivar',
        type: String,
    })
    async deactivate(@Param('id') id: string): Promise<void>{
        await this.proveedoresServies.deactivate(id);
    }


     //Controlador para Activar
    @Put('active/:id')
    @Roles(ERole.MODERATOR, ERole.ADMIN, ERole.USER)
    @UseGuards(AuthGuard(), RolesGuards)
    @ApiOperation({summary:'Activar un proveedor'})
    @ApiResponse({status: 204, description: 'Proveedor activado'})
    @ApiResponse({status:400, description:'No se encuentra el proveedor'})
    @ApiResponse({status:404, description:'Solicitud incorrecta'})
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Id del proveedor que desea activar',
        type: String,
    })
    async active(@Param('id') id: string): Promise<void>{
        await this.proveedoresServies.active(id);
    }



    //Controlador para eliminar
    @Delete('delete/:id')
    @Roles(ERole.MODERATOR, ERole.ADMIN, ERole.USER)
    @UseGuards(AuthGuard(), RolesGuards)
        @ApiOperation({summary:'Eliminar un proveedor'})
        @ApiResponse({status: 204, description: 'Proveedor eliminado'})
        @ApiResponse({status:400, description:'No se encuentra el proveedor'})
        @ApiResponse({status:404, description:'Solicitud incorrecta'})
        @ApiParam({
            name: 'id',
            required: true,
            description: 'Id del proveedor que desea eliminar',
            type: String,
        })
    async delete(@Param('id') id: string): Promise<void>{
        await this.proveedoresServies.delete(id);
    }


    //Controlador para obtener todos los proveedores
    @Get()
    @ApiOperation({summary: 'Obtener todos los proveedores'})
    @ApiResponse({status:200, description: 'Lista de proveedores ', type:[Proveedores] })
    @ApiResponse({status: 404, description: 'Paises no encontrados'})
    async findAll(): Promise<Proveedores[]>{
        return await this.proveedoresServies.findAll();
    }


    //Controlador para obtener por id
    @Get(':id')
    @ApiOperation({summary:'Obtener un proveedor por su Id'})
    @ApiResponse({status: 204, description: 'Proveedor encontrado'})
    @ApiResponse({status:400, description:'No se encuentra el proveedor'})
    @ApiResponse({status:404, description:'Solicitud incorrecta'})
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Id del proveedor que desea obtener',
        type: String,
    })
    async findOne(@Param('id') id: string): Promise<Proveedores>{
        return await this.proveedoresServies.findOne(id)
    }


    //Controlador para actualizar todo el proveedor
    @Put('update/:id')
    @Roles(ERole.MODERATOR, ERole.ADMIN, ERole.USER)
    @UseGuards(AuthGuard(), RolesGuards)
    @ApiOperation({summary: 'Actualizar de un proveedor'}) 
    @ApiResponse({status: 201, description: 'El proveedor ha sido actualizado'}) 
    @ApiResponse({status: 400, description: 'No se encuentra el proveedor'})
    @ApiResponse({status:404, description:'Solicitud incorrecta'})
    @ApiBody({
        description: 'Cuerpo de solicitud para actualizar un nuevo proveedor',
        examples:{
            example:{
                summary: 'Ejemplo de actualización',
                value:{
                    nombre_proveedor: 'Proveedor_actualizado',
                    email_proveedor: 'proveedorudpate@gmail.com',
                    celular_proveedor: '1234567'
                }
            }
        }
    })
    
    async update(@Param('id') id: string, @Body() updateProveedoresDto: UpdateProveedoresDto): Promise<Proveedores>{
        const updateProveedor = await this.proveedoresServies.update(id, updateProveedoresDto);
        if(!updateProveedor){
            throw new NotFoundException(`Proveedor con Id ${id} no se encontro`);
        }
        return updateProveedor;
    }

    @Patch('updatePartial/:id')
    @Roles(ERole.MODERATOR, ERole.ADMIN, ERole.USER)
    @UseGuards(AuthGuard(), RolesGuards)
    @ApiOperation({summary: 'Actualizar de un proveedor parcialmente'}) 
    @ApiResponse({status: 201, description: 'El proveedor ha sido actualizado'}) 
    @ApiResponse({status: 400, description: 'No se encuentra el proveedor'})
    @ApiResponse({status:404, description:'Solicitud incorrecta'})
    @ApiBody({
        description: 'Cuerpo de solicitud para actualizar un nuevo proveedor',
        examples:{
            example:{
                summary: 'Ejemplo de actualización',
                value:{
                    nombre_proveedor: 'Proveedor_actualizacionParcial',
                    email_proveedor: 'proveedorudpateparcial@gmail.com',
                    celular_proveedor: '12345674354'
                }
            }
        }
    })
    async updatePartial(@Param('id') id: string, @Body() updateProveedoresDto: UpdateProveedoresDto): Promise<Proveedores>{
        const updatePartialProveedor = await this.proveedoresServies.updatePartial(id, updateProveedoresDto);
        if(!updatePartialProveedor){
            throw new NotFoundException(`Proveedor con Id ${id} no se encontro`);
        }
        return updatePartialProveedor;
    }

}
