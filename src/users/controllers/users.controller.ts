import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserOutput } from '../dtos/user-output.dto';
import { Serialize } from '../../common/interceptors/serialize.interceptor';

@Controller('users')
@Serialize(UserOutput)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/me')
  async currentUser(@Request() req): Promise<UserOutput | null> {
    const user = await this.userService.me(req.user);
    return user;
  }
}
