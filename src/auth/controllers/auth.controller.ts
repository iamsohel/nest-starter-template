import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignUpInput } from '../dtos/signup-input.dto';
import { SignUpOutput } from '../dtos/signup-output.dto';
import { AuthService } from '../services/auth.service';
import { SignInInput } from '../dtos/signin-input.dto';
import { SignInOutput } from '../dtos/signin-output.dto';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import { Public } from '../decorators/public.decorator';
import { AppLogger } from '../../common/logger/logger.service';
import { ReqContext } from '../../common/request-context/req-context.decorator';
import { RequestContext } from '../../common/request-context/request-context.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: AppLogger
  ) {
    this.logger.setContext(AuthController.name);
  }

  @Serialize(SignUpOutput)
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  async signUp(@Body() input: SignUpInput): Promise<SignUpOutput> {
    const registeredUser = await this.authService.signup(input);
    return registeredUser;
  }

  @Serialize(SignInOutput)
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signIn(
    @ReqContext() ctx: RequestContext,
    @Body() input: SignInInput
  ): Promise<SignInOutput> {
    this.logger.log(ctx, `${this.signIn.name} was called`);
    const token = await this.authService.signIn(input);
    return token;
  }
}
