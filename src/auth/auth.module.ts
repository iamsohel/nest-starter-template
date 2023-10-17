import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports: [UsersModule, JwtModule.registerAsync({
    useFactory: () => ({
      secret: 'hard!to-guess_secret'
    })
  })],
  providers: [AuthService],
})
export class AuthModule { }
