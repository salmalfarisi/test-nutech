import { Request, Response } from "express";
import { TransactionService } from "./transaction.service";
import { PaginationDTO, Trans } from "./dto/transaction.dto";
import { SuccessDto } from "../../common/dto/success.dto";
import { ErrorDto } from "../../common/dto/error.dto";

const service = new TransactionService();

export class TransactionController {
  async topUpBalance(req: Request, res: Response) {
    try {
      const token = (req as any).user;
      const setTransaction = new Trans();
      setTransaction.amount = req.body.top_up_amount;
      const result = await service.makeTransaction("CREDIT", token.email, setTransaction);

      return res.status(200).json(new SuccessDto("Top Up Balance Berhasil", 0, result));
    } catch (err: any) {
      return res.status(400).json(new ErrorDto(err.message, 102));
    }
  }

  async postTransaction(req: Request, res: Response) {
    try {
      const token = (req as any).user;
      const setTransaction = new Trans();
      setTransaction.service = req.body.service_code;
      const result = await service.makeTransaction("DEBIT", token.email, setTransaction);

      return res.status(200).json(new SuccessDto("Transaksi berhasil", 0, result));
    } catch (err: any) {
      return res.status(400).json(new ErrorDto(err.message, 102));
    } 
  }
  
  async transactionHistory(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const param = req.query;
      const setParam = new PaginationDTO();
      setParam.limit = Number(param.limit) || 1;
      setParam.offset = Number(param.offset) || 1;
      const result = await service.history(user.email, setParam);

      return res.status(200).json(new SuccessDto("Get History Berhasil", 0, {
        limit: setParam.limit, offset: setParam.offset, record: result
      }));
    } catch (err: any) {
      return res.status(400).json(new ErrorDto(err.message, 102));
    }
  }
}