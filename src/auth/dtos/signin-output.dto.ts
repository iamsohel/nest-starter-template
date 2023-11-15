import { Expose } from 'class-transformer';
export class SignInOutput {
  @Expose()
  access_token: string;
}
