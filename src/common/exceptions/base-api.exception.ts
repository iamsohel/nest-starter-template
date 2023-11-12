import { HttpException } from '@nestjs/common';

export class BaseApiException extends HttpException {
  public details: string | Record<string, any>;

  constructor(
    message: string,
    status: number,
    details?: string | Record<string, any>
  ) {
    // Calling parent constructor of base Exception class.
    super(message, status);
    this.name = BaseApiException.name;
    if (details) {
      this.details = details;
    }
  }
}
