import {
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from "class-validator";

export class TransactionDTO {
  @IsString()
  @IsNotEmpty()
  service_code: string;
}

export class TopUpAmountDTO {
  @IsInt({ message: 'Amount must number' })
  @Min(1, { message: 'Top up amount at least 1 $' })
  top_up_amount: number;
}

export class PaginationDTO {
  @IsInt({ message: 'Offset haru angka' })
  @Min(1, { message: 'Offset minimal 1' })
  offset: number;
  
  @IsInt({ message: 'Limit haru angka' })
  @Min(1, { message: 'Limit minimal 1' })
  limit: number;
}

export class Trans {
  service: string;
  amount: number
}