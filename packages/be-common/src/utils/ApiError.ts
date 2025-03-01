class ApiError extends Error {
  statusCode: number;
  message: string;
  data: null;
  errors: [];
  stack: string;
  constructor(
    statusCode: number,
    message: string = "something went wrong",
    errors: [] = [],
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.errors = errors;
    
    if (stack) {
      this.stack = stack;
    }
  }
}

export { ApiError }