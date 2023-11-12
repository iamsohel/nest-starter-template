import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeavesModule } from './leaves/leaves.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [CommonModule, LeavesModule, UsersModule, AuthModule],
})
export class AppModule {}
