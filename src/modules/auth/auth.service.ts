import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Crypt } from 'src/core/util/crypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.findOneByEmailWithPassword(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isSamePassword = await Crypt.compare(password, user.password);

    if (!isSamePassword) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, user_email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
