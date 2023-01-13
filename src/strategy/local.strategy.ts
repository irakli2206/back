import {
  AuthService
} from 'src/auth/auth.service';
import {
  Strategy
} from 'passport-local';
import {
  PassportStrategy
} from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException
} from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    //By default Passport accepts fields username and password, but I changed username field to userhandle
    super({
      usernameField: 'userhandle',
      passwordField: 'password'
    });
  }

  async validate(userhandle: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(userhandle, password);
    if (!user) {
      console.log('reached')
      throw new UnauthorizedException({
        message: "You have entered a wrong username or password"
      });
    }
    return user;
  }
}