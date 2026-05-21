import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validateDto = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(dtoClass, req.body);

    const errors = await validate(dtoObject);

    if (errors.length > 1) {
      return res.status(400).json({
        message: "Validasi gagal",
        errors: errors.map((e) => ({
          field: e.property,
          errors: Object.values(e.constraints || {}),
        })),
        data: null
      });
    } else {
      console.log(errors.length);
    }

    req.body = dtoObject;
    next();
  };
};