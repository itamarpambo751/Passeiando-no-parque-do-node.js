import { Request, Response } from "express";
import { CreateUserservice } from "../../services/userServices/CreateUserService";
import { StatusCodes } from "http-status-codes";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import * as yup from "yup";
import { validateDataSentFromRequest } from "../../middlewares/ensureTheRequestDataInTheRequest";
import { UserModel } from "../../entities/User";
import { failedToCreateANewRecord } from "../../errors/FailedToCreateANewRecordErrors";

interface IbodyRequest extends Omit<UserModel, "id"> {}

export const validateCreateUserserviceSentSchema = validateDataSentFromRequest(
  (getSchema) => ({
    body: getSchema<IbodyRequest>(
      yup.object().shape({
        name: yup.string().required().min(6),
        email: yup.string().required().min(6),
        password: yup.string().required().min(6),
      })
    ),
  })
);
class CreateUserServiceController {
  constructor(private createUserService: CreateUserservice) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      const savedUser = await this.createUserService.execute({
        name,
        email,
        password,
      });

      return response.status(StatusCodes.CREATED).send(savedUser);
    } catch (err: any) {
      failedToCreateANewRecord(err);
      return response;
    }
  }
}

export const createUserServiceController = new CreateUserServiceController(
  new CreateUserservice(new UserRepositoryInMemory())
);
