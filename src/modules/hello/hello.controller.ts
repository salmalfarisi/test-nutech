import { Request, Response } from "express";

import { HelloService } from "./hello.service";

import { SuccessDto } from "../../common/dto/success.dto";
import { ErrorDto } from "../../common/dto/error.dto";

const service = new HelloService();

export class HelloController {
  async hello(req: Request, res: Response) {
    try {
      const result = await service.hello();

      return res
        .status(200)
        .json(new SuccessDto("Success", 0, result));
    } catch (error) {
      return res
        .status(500)
        .json(new ErrorDto("Internal Server Error", 102, error));
    }
  }

  async dummyService(req: Request, res: Response) {
    try {
      const result = await service.seedServices();

      return res
        .status(200)
        .json(new SuccessDto("Success", 0, result));
    } catch (error) {
      return res
        .status(500)
        .json(new ErrorDto("Internal Server Error", 102, error));
    }
  }
  
  async dummyBanner(req: Request, res: Response) {
    try {
      const result = await service.seedBanners();

      return res
        .status(200)
        .json(new SuccessDto("Success", 0, result));
    } catch (error) {
      return res
        .status(500)
        .json(new ErrorDto("Internal Server Error", 102, error));
    }
  }
  
  async getService(req: Request, res: Response) {
    try {
      const result = await service.getServices();

      return res
        .status(200)
        .json(new SuccessDto("Sukses", 0, result));
    } catch (error) {
      return res
        .status(500)
        .json(new ErrorDto("Internal Server Error", 102, error));
    }
  }
  
  async getBanner(req: Request, res: Response) {
    try {
      const result = await service.getBanners();

      return res
        .status(200)
        .json(new SuccessDto("Sukses", 0, result));
    } catch (error) {
      return res
        .status(500)
        .json(new ErrorDto("Internal Server Error", 102, error));
    }
  }
}