import {
    Module
} from '@nestjs/common';
import {
    AuthService
} from './auth.service';
import {
    AuthController
} from './auth.controller';
import {
    MongooseModule
} from '@nestjs/mongoose';
import {
    User,
    UsersSchema
} from 'src/users/user.model';
import {
    JwtModule
} from '@nestjs/jwt';
import {
    jwtConstants
} from 'src/strategy/constants';
import {
    UsersService
} from 'src/users/users.service';
import {
    HashService
} from 'src/users/hash.service';
import {
    LocalStrategy
} from 'src/strategy/local.strategy';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UsersSchema
        }]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: '60d'
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersService, LocalStrategy, HashService],
})
export class AuthModule { }