import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { SignUpInput } from 'src/auth/dtos/signup-input.dto';
import { SignUpOutput } from 'src/auth/dtos/signup-output.dto';
import { plainToClass } from 'class-transformer';
import { hash } from 'bcrypt';
import { SignInInput } from '../dtos/signin-input.dto';
import { SignInOutput } from '../dtos/signin-output.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async signup(input: SignUpInput): Promise<SignUpOutput> {
        const user = plainToClass(User, input);
        user.password = await hash(input.password, 10)
        await this.usersRepository.save(user);
        return plainToClass(SignUpOutput, user, {
            excludeExtraneousValues: true
        })
    }

    signIn(input: SignInInput): SignInOutput {

        const subject = { sub: 1 };
        const payload = {
            email: 'sohel@gmail.com',
        };

        const token = {
            token: this.jwtService.sign(
                { ...payload, ...subject },
                { expiresIn: 1 },
            ),
        };
        return token;
    }



}
