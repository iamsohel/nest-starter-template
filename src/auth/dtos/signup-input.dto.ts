import { IsEmail, IsString } from 'class-validator';
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
    password: string;
}