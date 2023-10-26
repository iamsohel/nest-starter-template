import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { SignUpInput } from 'src/auth/dtos/signup-input.dto';
import { SignUpOutput } from 'src/auth/dtos/signup-output.dto';
import { plainToClass } from 'class-transformer';
import { hash } from 'bcrypt';
import { UserOutput } from '../dtos/user-output.dto';
import { AccessTokenOutput } from 'src/auth/dtos/access-token-output.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    async me(user: AccessTokenOutput): Promise<UserOutput | null> {
        const currentUser = await this.usersRepository.findOneBy({ id: user.id });
        if (!currentUser) {
            throw new NotFoundException('User not found')
        }
        return currentUser;
    }

    async createUser(input: SignUpInput): Promise<SignUpOutput> {
        const user = plainToClass(User, input);
        user.password = await hash(input.password, 10)
        await this.usersRepository.save(user);
        return user;
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
