export class BaseApiResponse<T> {
  public data: T;
}
export class BaseApiErrorObject {
  public statusCode: number;

  public message: string;

  public errorName: string;

  public details: unknown;

  public path: string;

  public requestId: string;

  public timestamp: string;
}

export class BaseApiErrorResponse {
  public error: BaseApiErrorObject;
}
