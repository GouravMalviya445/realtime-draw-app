class ApiError extends Error {
  statusCode: number;
  message: string;
  data: null;
  errors: any[];
  stack?: string;
  constructor(
    statusCode: number,
    message: string = "something went wrong",
    errors: any[] = [],
    stack?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.errors = errors;
    
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError }