import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeavesModule } from './leaves/leaves.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'vl-hr-dev-db',
    entities: [User],
    synchronize: true,
  }), LeavesModule, UsersModule, AuthModule],
})
export class AppModule { }
