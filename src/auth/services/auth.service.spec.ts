import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SignInOutput } from '../dtos/signin-output.dto';

describe('UsersService', () => {
  let service: AuthService;

  const loginInput = {
    password: 'any password',
    email: 'randomUser@random.com',
  };

  const accessToken: SignInOutput = {
    access_token: 'access_token',
  };

  const fakeUserService = {
    signIn: jest.fn(),
    signup: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return auth token for valid user', async () => {
      jest.spyOn(service, 'signIn').mockImplementation(async () => accessToken);

      const result = service.signIn(loginInput);

      console.log(result);

      // expect(service.getaccessToken).toBeCalledWith(ctx, accessTokenClaims);
      expect(result).toEqual(accessToken);
    });
  });
});
