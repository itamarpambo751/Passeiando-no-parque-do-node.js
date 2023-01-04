import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpExceptionErrors } from "../../errors/httpExceptionsErrors";
import { CreatePermissionService } from "../../services/permissionsServices/CreatePermissionService";
import * as yup from "yup";
import { validateDataSentFromRequest } from "../../middlewares/validateTheDataSentMiddleware";
import { PermissionRepositoryInMemory } from "../../repositories/in-memory/PermissionRepositoryInMemory";
import { PermissionModel } from "../../entities/Permission";

interface IbodyRequest extends Omit<PermissionModel, "id">{};

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
      const result = await this.createPermitionService.execute({ name });

      if (result instanceof HttpExceptionErrors)
        return response
          .status(result.statusCode)
          .json({ message: result.message });

      return response.status(StatusCodes.CREATED).send();
    } catch (err: any) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}

export const createPermissionServicecontroller = new CreatePermissionServiceController(
  new CreatePermissionService(
    new PermissionRepositoryInMemory()
    )
);
