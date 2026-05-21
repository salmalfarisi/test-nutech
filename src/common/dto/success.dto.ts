export class SuccessDto<T> {
  success: boolean;
  message: string;
  status: number;
  data?: T;

  constructor(message: string, status: number, data?: T) {
    // this.success = true;
    this.message = message;
    this.data = data;
    this.status = status;
  }
}