import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpExceptionErrors } from "../../errors/httpExceptionsErrors";
import { CreateRoleService } from "../../services/rolesServices/CreateRoleService";
import * as yup from "yup";
import { validateDataSentFromRequest } from "../../middlewares/validateTheDataSentMiddleware";
import { RoleRepositoryInMemory } from "../../repositories/in-memory/RoleRepositoryInMemory";
import { RoleModel } from "../../entities/Role";
import { failedToCreateANewRecord } from "../../errors/FailedToCreateANewRecordErrors";

interface IbodyRequest extends Omit<RoleModel, "id">{};

export const validateCreateRoleServiceSentSchema = validateDataSentFromRequest(
  (getSchema) => ({
    body: getSchema<IbodyRequest>(
      yup.object().shape({
        name: yup.string().required().min(3),
      })
    ),
  })
);

export class CreateRoleServiceController {
  constructor(private createRoleService: CreateRoleService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    try {
      const requestResult = await this.createRoleService.execute({ name });

      if (requestResult instanceof HttpExceptionErrors) {

        failedToCreateANewRecord(requestResult);
        return response;
      };

      return response
        .setHeader("New-Record-Successfully-Created", "X-Records, X-StatusCode")
        .setHeader("X-Records", 1)
        .setHeader("X-StatusCode", StatusCodes.CREATED)
        .status(StatusCodes.CREATED)
        .send();

    } catch (err: any) {

      failedToCreateANewRecord(err);
      return response;
    };
  };
};

export const createRoleServicecontroller = new CreateRoleServiceController(
  new CreateRoleService(new RoleRepositoryInMemory())
);