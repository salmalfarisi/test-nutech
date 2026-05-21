export class ErrorDto {
  success!: boolean;
  message!: string;
  status: number
  error?: unknown;

  constructor(message: string, status: number, error?: unknown) {
    // this.success = false;
    this.message = message;
    this.error = error;
    this.status = status;
  }
}