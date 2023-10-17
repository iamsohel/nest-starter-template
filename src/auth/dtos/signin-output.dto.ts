import { Expose } from 'class-transformer';
export class SignInOutput {
    @Expose()
    token: string;
}