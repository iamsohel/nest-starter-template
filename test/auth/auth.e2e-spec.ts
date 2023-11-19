import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../../src/app.module';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';

import { SignInInput } from '../../src/auth/dtos/signin-input.dto';
import { SignUpInput } from 'src/auth/dtos/signup-input.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('register a new user', () => {
    const registerInput: SignUpInput = {
      email: 'hello@test.com',
      password: '123A@wedewes',
      employeeId: 'IS01',
      lastName: 'sohel',
      firstName: 'rana',
      designation: 'dev',
    };

    const registerOutput = {
      email: 'hello@test.com',
    };

    it('successfully register a new user', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(registerInput)
        .expect(HttpStatus.CREATED)
        .expect((res) => {
          const resp = res.body;
          expect(resp).toEqual(expect.objectContaining(registerOutput));
        });
    });

    it('register fails without Input DTO', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('register fails when incorrect email format', () => {
      registerInput.email = 12345 as any;
      return request(app.getHttpServer())
        .post('/auth/signup')
        .expect(HttpStatus.BAD_REQUEST)
        .send(registerInput)
        .expect((res) => {
          const resp = res.body;
          expect(resp.error.details.message).toContain(
            'email must be an email'
          );
        });
    });
  });

  describe('login the registered user', () => {
    const loginInput: SignInInput = {
      email: 'hello@test.com',
      password: '123A@wedewes',
    };

    it('should successfully login the user', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send(loginInput)
        .expect(HttpStatus.OK)
        .expect((res) => {
          const token = res.body;
          expect(token).toHaveProperty('access_token');
        });
    });

    it('should failed to login with wrong credential', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({ ...loginInput, password: 'wrong-pass' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
