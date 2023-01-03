import { User } from "@prisma/client";
import { UserModel } from "../entities/User";
import { HttpExceptionErrors } from "../errors/httpExceptionsErrors";

export type ReturnTypeOfFindUserFunctions = User | null;

export interface UserRepositoryInterface {
  findByEmail(email: string): Promise<ReturnTypeOfFindUserFunctions>;
  save(user: UserModel): Promise<Partial<User>>;
  login(email: string, password: string): Promise<Object | HttpExceptionErrors>;
}
