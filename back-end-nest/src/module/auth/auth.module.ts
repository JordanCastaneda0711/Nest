import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { User, UserSchema } from './schema/auth.schema';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ConfigModule,
        JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            secret: 'YwWzJ3tT47#fjsLk73#@bH2R!v8y9K1P',
            signOptions: { expiresIn: '1h' },
        }),
        inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [AuthService, JwtStrategy ],
    controllers: [AuthController],
    exports: [JwtStrategy, PassportModule],
})

export class AuthModule {}