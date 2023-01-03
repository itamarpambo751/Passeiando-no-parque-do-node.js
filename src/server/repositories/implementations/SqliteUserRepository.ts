import {
  ReturnTypeOfFindUserFunctions,
  UserRepositoryInterface,
} from "../UserRepository";
import { User } from "@prisma/client";
import { prisma } from "../../../client/client";
import { UserModel } from "../../entities/User";
import { uuid } from "uuidv4";
import bcrypt from "bcrypt";
import { HttpExceptionErrors } from "../../errors/httpExceptionsErrors";
import { generateToken } from "../../middlewares/generateAccessTokenMiddleware";

export class SqliteUserRepository implements UserRepositoryInterface {
  async findByEmail(email: string): Promise<ReturnTypeOfFindUserFunctions> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async save({ name, email, password }: UserModel): Promise<Partial<User>> {
    const id = uuid();
    const encryptedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
      data: { id, name, email, password: encryptedPassword },

      select: { id: true, name: true, email: true, password: false },
    });
  }

  async login(
    email: string,
    password: string
  ): Promise<Object | HttpExceptionErrors> {
    const foundedUser = await prisma.user.findUnique({ where: { email } });

    if (!foundedUser) return new HttpExceptionErrors("User doesn`t exists.");

    const match = bcrypt.compare(password, foundedUser.password);

    if (!match) return new HttpExceptionErrors("Invalid password.");

    const { password: _, ...user } = foundedUser;

    return {
      user,
      accessToken: await generateToken(foundedUser),
    };
  }
}
