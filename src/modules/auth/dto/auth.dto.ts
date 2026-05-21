import { IsEmail, IsString, MinLength, IsNotEmpty, IsOptional } from "class-validator";

export class RegisterDTO {
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @IsString({ message: "First name must be a string" })
  @IsNotEmpty()
  first_name: string;

  @IsString({ message: "Last name must be a string" })
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters" })
  password: string;
}

export class LoginDTO {
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ProfileDTO {
  @IsEmail({}, { message: "Invalid email format" })
  @IsOptional()
  email: string;

  @IsString({ message: "First name must be a string" })
  @IsOptional()
  first_name: string;

  @IsString({ message: "Last name must be a string" })
  @IsOptional()
  last_name: string;

  @IsString()
  @IsOptional()
  @MinLength(8, { message: "Password must be at least 8 characters" })
  password: string;
  
  @IsString()
  @IsOptional()
  profile_image: string;
}