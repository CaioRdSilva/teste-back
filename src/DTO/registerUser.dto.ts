import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { Column } from 'typeorm';

export class RegisterUserDto {
  @IsNotEmpty()
  @MinLength(5)
  username: string;
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(20)
  @Matches(/(?:(?=.*\d)|(?=.*|W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha fraca',
  })
  password: string;
}
