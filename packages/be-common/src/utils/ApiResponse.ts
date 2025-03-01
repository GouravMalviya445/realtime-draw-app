class ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: object | null;

  constructor(
    statusCode: number,
    message: string,
    data: object | null
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}

export { ApiResponse }