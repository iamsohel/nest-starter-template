import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
export class SignUpInput {
  @IsEmail()
  email: string;

  @IsString()
  employeeId: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  designation?: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
