import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpExceptionErrors } from "../../errors/httpExceptionsErrors";
import { CreatePermissionService } from "../../services/permissionsServices/CreatePermissionService";
import * as yup from "yup";
import { validateDataSentFromRequest } from "../../middlewares/ensureTheRequestDataInTheRequest";
import { PermissionRepositoryInMemory } from "../../repositories/in-memory/PermissionRepositoryInMemory";
import { PermissionModel } from "../../entities/Permission";
import { failedToCreateANewRecord } from "../../errors/FailedToCreateANewRecordErrors";

interface IbodyRequest extends Omit<PermissionModel, "id"> {}

export const validateCreatePermissionServiceSentSchema =
  validateDataSentFromRequest((getSchema) => ({
    body: getSchema<IbodyRequest>(
      yup.object().shape({
        name: yup.string().required().min(3),
      })
    ),
  }));

export class CreatePermissionServiceController {
  constructor(private createPermitionService: CreatePermissionService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    try {
      const requestResult = await this.createPermitionService.execute({ name });

      if (requestResult instanceof HttpExceptionErrors) {
        failedToCreateANewRecord(requestResult);
        return response;
      }

      return response
        .setHeader("X-records-created", "x-records")
        .setHeader("x-records", 1)
        .status(StatusCodes.CREATED)
        .send();
    } catch (err: any) {
      failedToCreateANewRecord(err);
      return response;
    }
  }
}

export const createPermissionServicecontroller =
  new CreatePermissionServiceController(
    new CreatePermissionService(new PermissionRepositoryInMemory())
  );
