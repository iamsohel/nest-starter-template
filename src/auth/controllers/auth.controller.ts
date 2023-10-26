import { Body, ClassSerializerInterceptor, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { SignUpInput } from '../dtos/signup-input.dto';
import { SignUpOutput } from '../dtos/signup-output.dto';
import { AuthService } from '../services/auth.service';
import { SignInInput } from '../dtos/signin-input.dto';
import { SignInOutput } from '../dtos/signin-output.dto';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    @Serialize(SignUpOutput)
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('/signup')
    async signUp(@Body() input: SignUpInput): Promise<SignUpOutput> {
        const registeredUser = await this.authService.signup(input);
        return registeredUser;
    }

    @Serialize(SignInOutput)
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('/signin')
    async signIn(@Body() input: SignInInput): Promise<SignInOutput> {
        const token = await this.authService.signIn(input);
        return token;
    }
}
