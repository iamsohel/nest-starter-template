import { Expose } from 'class-transformer';
export class AccessTokenOutput {
    @Expose()
    id: number;

    @Expose()
    firstName: string;

    @Expose()
    email: string;
}