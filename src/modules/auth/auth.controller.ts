import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { SuccessDto } from "../../common/dto/success.dto";
import { ErrorDto } from "../../common/dto/error.dto";

const service = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      await service.register(req.body);

      return res.status(200).json(new SuccessDto("Registrasi berhasil silahkan login", 0, null));
    } catch (err: any) {
      return res.status(400).json(new ErrorDto(err.message, 102));
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await service.login(req.body);

      return res.status(200).json(new SuccessDto("Login Sukses", 0, result));
    } catch (err: any) {
      return res.status(400).json(new ErrorDto(err.message, 103));
    }
  }
  
  async profile(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const result = await service.profile(user.email);
    
      delete result.balance;
      return res.status(200).json(new SuccessDto("Sukses", 0, result));
    } catch (err: any) {
      return res.status(400).json(new ErrorDto(err.message, 102));
    }
  }
  
  async getBalance(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const result = await service.profile(user.email);
     
      return res.status(200).json(new SuccessDto("Sukses", 0, { balance: result.balance }));
    } catch (err: any) {
      return res.status(400).json(new ErrorDto(err.message, 102));
    }
  }

  async updateDataProfile(req: Request, res: Response) {
    try {
      const token = (req as any).user;
      console.log(req.body)
      const user = await service.updateProfile(token.email, req.body);

      return res.status(200).json(new SuccessDto("Update Profile berhasil", 0, user));
    } catch (err: any) {
      return res.status(400).json(new ErrorDto(err.message, 102));
    }
  }

  async updateDataImage(req: Request, res: Response) {
    try {
      const token = (req as any).user;

      const file = req.file as Express.Multer.File | undefined;

      const payload = {
        ...req.body,
        profile_image: file ? `/uploads/${file.filename}` : undefined,
      };

      const user = await service.updateProfile(token.email, payload);

      return res.status(200).json(new SuccessDto("Update Profile Image Berhasil", 0, user));
    } catch (err: any) {
      return res.status(400).json(new ErrorDto(err.message, 102));
    }
  }
}