import { AppDataSource } from "../../config/database";
import { User } from "../../../entities/users.entities";
import { LoginDTO, ProfileDTO, RegisterDTO } from "./dto/auth.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { publishEvent } from "../../config/rabbitmq";

export class AuthService {
  async register(data: RegisterDTO) {
    return await AppDataSource.transaction(async (manager) => {
      const repo = manager.getRepository(User);

      const existing = await repo.findOne({
        where: { email: data.email },
      });

      if (existing) {
        throw new Error("Email already exists");
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = repo.create({
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        password: hashedPassword,
        balance: 0,
      });

      const saved = await repo.save(user);

      const { password, ...safeUser } = saved;
      return safeUser;
    });
  }

  async login(data: LoginDTO) {
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error("Username atau password salah");
    }

    const isValid = await bcrypt.compare(data.password, user.password);

    if (!isValid) {
      throw new Error("Username atau password salah");
    }

    console.log("SIGN SECRET via Login:", process.env.JWT_SECRET);
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
      },
      process.env.JWT_SECRET || "TEST123",
      { expiresIn: "1d" }
    );

    return {
      token,
    };
  }

  async profile(email: string) {
    const repo = AppDataSource.getRepository(User);

    const profile = await repo.findOne({
        where: { email: email },
    });

    return {
      email: profile?.email,
      first_name: profile?.firstName,
      last_name: profile?.lastName,
      profile_image: profile?.profileImage,
      balance: profile?.balance
    }
  }

  async updateProfile(email: string, data: ProfileDTO, file?: Express.Multer.File) {
    return await AppDataSource.transaction(async (manager) => {
      const repo = manager.getRepository(User);

      const existing = await repo.findOne({
        where: { email: email },
      });

      if (existing) {
        console.log(data)
        if (data.first_name) {
          existing.firstName = data.first_name;
        }

        if (data.last_name) {
          existing.lastName = data.last_name;
        }

        if (data.profile_image) {
          existing.profileImage = data.profile_image;
        }

        if (data.password) {
          existing.password = await bcrypt.hash(data.password, 10);
        }

        const saved = await repo.save(existing);
  
        return {
          email: existing?.email,
          first_name: existing?.firstName,
          last_name: existing?.lastName,
          profile_image: existing?.profileImage
        }
      } else {
        throw new Error("Data not found");
      }

    });
  }
}