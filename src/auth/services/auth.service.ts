import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { SignUpInput } from 'src/auth/dtos/signup-input.dto';
import { SignUpOutput } from 'src/auth/dtos/signup-output.dto';
import { compare, hash } from 'bcrypt';
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

    async signup(signUpInput: SignUpInput): Promise<SignUpOutput> {
        const user = this.usersRepository.create(signUpInput);
        user.password = await hash(user.password, 10)
        await this.usersRepository.save(user);
        return user;
    }

    async signIn(input: SignInInput): Promise<SignInOutput> {
        const user = await this.usersRepository.findOne({ where: { email: input.email } });
        if (!user) throw new BadRequestException('Email or password is incorrect');

        const match = await compare(input.password, user.password);
        if (!match) throw new BadRequestException('Email or password is incorrect');
        const payload = {
            id: user.id,
            email: user.email,
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }



}
