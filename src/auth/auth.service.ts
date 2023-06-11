import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserLoginDto } from 'src/DTO/userLogin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    private jwt: JwtService,
  ) {}

  async registerUser(RegisterDTO: RegisterUserDto) {
    const { username, password } = RegisterDTO;
    const hashed = await bcrypt.hash(password, 12);
    const salt = bcrypt.getSalt(hashed);

    const user = new UserEntity();
    user.username = username;
    user.password = hashed;
    user.salt = salt;

    this.repo.create(user);
    try {
      return await this.repo.save(user);
    } catch (err) {
      throw new InternalServerErrorException('User not created');
    }
  }

  async loginUser(LoginDTO: UserLoginDto) {
    const { username, password } = LoginDTO;

    const user = await this.repo.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('Incvalid credentials');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      const jwtPayload = { username };
      const jwtToken = await this.jwt.signAsync(jwtPayload, {
        expiresIn: '1d',
        algorithm: 'HS512',
      });
      return { token: jwtToken };
    } else {
      throw new UnauthorizedException('Incvalid credentials');
    }
  }
}
