import { Expose } from 'class-transformer';
export class SignUpOutput {
    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    email: string;

    @Expose()
    phone: string;
}