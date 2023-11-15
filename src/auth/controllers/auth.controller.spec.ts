import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { AppLogger } from '../../common/logger/logger.service';

describe('AuthController', () => {
  let controller: AuthController;
  const fakeAuthService = {
    signup: jest.fn(),
    signIn: jest.fn(),
  };
  const fakeAppLogger = {
    setContext: jest.fn(),
    log: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
        {
          provide: AppLogger,
          useValue: fakeAppLogger,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
