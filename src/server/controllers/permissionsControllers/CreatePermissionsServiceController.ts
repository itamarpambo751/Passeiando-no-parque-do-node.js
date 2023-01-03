import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpExceptionErrors } from "../../errors/httpExceptionsErrors";
import { CreatePermitionService } from "../../services/permissionsServices/CreatePermissionService";
import * as yup from "yup";
import { validateDataSentFromRequest } from "../../middlewares/validateTheDataSentMiddleware";
import { PermissionRepositoryInMemory } from "../../repositories/in-memory/PermissionRepositoryInMemory";

interface IbodyRequest {
  name: string;
}

export const validateCreatePermitionServiceSentSchema =
  validateDataSentFromRequest((getSchema) => ({
    body: getSchema<IbodyRequest>(
      yup.object().shape({
        name: yup.string().required().min(3),
      })
    ),
  }));

export class CreateRoleServiceController {
  constructor(private createPermitionService: CreatePermitionService) {}

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

export const createPermitionServicecontroller = new CreateRoleServiceController(
  new CreatePermitionService(
    new PermissionRepositoryInMemory()
    )
);
