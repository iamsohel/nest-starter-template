import { Body, Controller, Post } from '@nestjs/common';
import { SignUpInput } from '../dtos/signup-input.dto';
import { SignUpOutput } from '../dtos/signup-output.dto';
import { AuthService } from '../services/auth.service';
import { SignInInput } from '../dtos/signin-input.dto';
import { SignInOutput } from '../dtos/signin-output.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    @Post('/signup')
    async signUp(@Body() input: SignUpInput): Promise<SignUpOutput> {
        console.log(input)
        const registeredUser = await this.authService.signup(input);
        return registeredUser;
    }

    @Post('/signin')
    async signIn(@Body() input: SignInInput): Promise<SignInOutput> {
        console.log(input)
        const token = await this.authService.signIn(input);
        return token;
    }
}
