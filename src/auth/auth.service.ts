import {
    UsersService
} from 'src/users/users.service';
import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import {
    JwtService
} from '@nestjs/jwt';
import {
    HashService
} from 'src/users/hash.service';
import { User, UserLogin } from 'src/users/user.model';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private hashService: HashService,
        private jwtService: JwtService) { }


    async validateUser(userhandle: string, password: string) {
        const user = await this.usersService.getUserByUserhandle(userhandle)
        if (user && (await this.hashService.comparePassword(password, user.password))) {
            return user;
        }
        return null
    }

    async loginUser(userCreds: UserLogin) {
        const { userhandle, password } = userCreds
        let user = await this.usersService.getUserByUserhandle(userhandle)
        if (!user) {
            throw new BadRequestException('No such user exists', { cause: new Error(), description: 'No such user exists' });
        }
        let passwordIsRight = await this.hashService.comparePassword(password, user.password)
        if (!passwordIsRight) {
            throw new BadRequestException('Wrong password', { cause: new Error(), description: 'Wrong password' });
        }
        return {
            user,
            access_token: this.jwtService.sign({ userhandle: user.userHandle })
        }
    }

}