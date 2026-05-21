import { AppDataSource } from "../../config/database";
import { User } from "../../entities/users.entities";
import { Transaction } from "../../entities/transactions.entities";
import { PaginationDTO, Trans, TransactionDTO } from "./dto/transaction.dto";
import { Service } from "../../entities/services.entities";
import { publishEvent } from "../../config/rabbitmq";

export class TransactionService {
  async makeTransaction(operation: string, email: string, data: Trans) {
    return await AppDataSource.transaction(async (manager) => {
      const userRepo = manager.getRepository(User);
      const trxRepo = manager.getRepository(Transaction);

      const user = await userRepo.findOne({
        where: { email: email },
      });

      if (!user) {
        throw new Error("Token kadaluarsa atau tidak valid");
      }

      let newBalance = user.balance;

      if (operation === "CREDIT") {
        newBalance += data.amount;
      }

      let findService = null;
      if (operation === "DEBIT") {
        console.log(data)
        const serviceRepo = manager.getRepository(Service);
        findService = await serviceRepo.findOne({
          where: { serviceCode: data.service }
        });

        console.log(findService)

        if(findService === null || findService === undefined) {
          throw new Error ("Service atau Layanan tidak ditemukan");
        }
        
        if (user.balance < findService.serviceTariff) {
          throw new Error ("Mohon maaf. tidak bisa melanjutkan proses. Saldo anda dibawah harga service yang sudah ditetapkan");
        }
        newBalance -= findService.serviceTariff;
      }

      user.balance = newBalance;
      await userRepo.save(user);

      const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      const insertData = new Transaction()
      insertData.userId = user.id;
      insertData.serviceCode = findService?.serviceCode;
      insertData.serviceName = findService?.serviceName;
      insertData.invoiceNumber = invoiceNumber;
      insertData.transactionType = operation;
      insertData.totalAmount = findService?.serviceTariff || data.amount;
      insertData.status = "SUCCESS";
      insertData.description = (operation == "CREDIT" ? "Top Up balance" : "Pembayaran " + findService?.serviceName);

      const transaction = trxRepo.create(insertData);

      await trxRepo.save(transaction);
      try {
        publishEvent("transaction.created", {
          invoice_number: transaction.invoiceNumber,
          email: user.email,
        });
      } catch (err) {
        console.error("RabbitMQ publish failed:", err);
      }

      return {
        invoice_number: transaction.invoiceNumber,
        service_code: transaction.serviceCode,
        service_name: transaction.serviceName,
        transaction_type: transaction.transactionType,
        total_amount: transaction.totalAmount,
        created_on: transaction.createdOn
      };
    });
  }

  async history(email: string, data: PaginationDTO) {
    const repo = AppDataSource.getRepository(Transaction);
    const src = AppDataSource.getRepository(User);

    const profile = await src.findOne({
        where: { email: email },
    });
    
    const history = await repo.find({
        where: { userId: profile?.id },
        take: data.limit,
        skip: (data.offset - 1) * data.limit,
        order: { createdOn: 'DESC' }
    });

    let result = [];
    for(let x = 0; x < history.length; x++) {
      result.push({
        invoice_number: history[x].invoiceNumber,
        transaction_type: history[x].transactionType,
        description: history[x].description,
        total_amount: history[x].totalAmount,
        created_on: history[x].createdOn
      });
    }

    return result;
  }
}