import { SignUpOutput } from 'src/auth/dtos/signup-output.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SignInOutput } from '../dtos/signin-output.dto';
import { SignInInput } from '../dtos/signin-input.dto';
import { SignUpInput } from '../dtos/signup-input.dto';

describe('UsersService', () => {
  let service: AuthService;

  const loginInput: SignInInput = {
    password: 'any password',
    email: 'randomUser@random.com',
  };

  const accessToken: SignInOutput = {
    access_token: 'access_token',
  };

  const signupInput: SignUpInput = {
    email: 'sohel@me.com',
    password: 'password',
    employeeId: 'isx',
    firstName: 'f',
    lastName: 'l',
    designation: 'd',
  };

  const signUpOutput: SignUpOutput = {
    email: 'sohel@me.com',
    phone: 'password',
    id: 1,
    firstName: 'f',
    lastName: 'l0',
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

  describe('signup', () => {
    it('should register new user', async () => {
      jest
        .spyOn(service, 'signup')
        .mockImplementation(async () => signUpOutput);
      const result = await service.signup(signupInput);
      expect(result).toEqual(signUpOutput);
    });
  });

  describe('signIn', () => {
    it('should return auth token for valid user', async () => {
      jest.spyOn(service, 'signIn').mockImplementation(async () => accessToken);

      const result = await service.signIn(loginInput);

      expect(result).toEqual(accessToken);
    });
  });
});
