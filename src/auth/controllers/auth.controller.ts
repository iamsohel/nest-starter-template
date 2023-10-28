import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { SignUpInput } from '../dtos/signup-input.dto';
import { SignUpOutput } from '../dtos/signup-output.dto';
import { AuthService } from '../services/auth.service';
import { SignInInput } from '../dtos/signin-input.dto';
import { SignInOutput } from '../dtos/signin-output.dto';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { Public } from '../decorators/public.decorator';
import { AppLogger } from 'src/shared/logger/logger.service';
import { BaseApiResponse } from 'src/shared/dtos/base-api-response.dto';
import { ReqContext } from 'src/shared/request-context/req-context.decorator';
import { RequestContext } from 'src/shared/request-context/request-context.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly logger: AppLogger,
        ) {
            this.logger.setContext(AuthController.name)
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
    async signIn(@ReqContext() ctx: RequestContext, @Body() input: SignInInput): Promise<SignInOutput> {
        this.logger.log(ctx, `${this.signIn.name} was called`);
        const token = await this.authService.signIn(input);
        return token;
    }
}
