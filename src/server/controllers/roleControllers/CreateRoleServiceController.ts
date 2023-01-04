import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpExceptionErrors } from "../../errors/httpExceptionsErrors";
import { CreateRoleService } from "../../services/rolesServices/CreateRoleService";
import * as yup from "yup";
import { validateDataSentFromRequest } from "../../middlewares/validateTheDataSentMiddleware";
import { RoleRepositoryInMemory } from "../../repositories/in-memory/RoleRepositoryInMemory";
import { RoleModel } from "../../entities/Role";

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
      const result = await this.createRoleService.execute({ name });

      if (result instanceof HttpExceptionErrors) {
        
        return response
          .setHeader("failed-to-create-record", "x-error, x-message")
          .setHeader("x-error", result.statusCode)
          .setHeader("x-message", result.message)
          .status(result.statusCode)
          .json({ message: result.message });
      };

      return response
        .setHeader("X-records-created", "x-records")
        .setHeader("x-records", 1)
        .status(StatusCodes.CREATED)
        .send();

    } catch (err: any) {

      return response
        .setHeader("failed-to-create-record", "x-error, x-message")
        .setHeader("x-error", StatusCodes.BAD_REQUEST)
        .setHeader("x-message", err.message)
        .status(StatusCodes.BAD_REQUEST)
        .json({
          message: err.message || "Unexpected error.",
        });
    };
  };
};

export const createRoleServicecontroller = new CreateRoleServiceController(
  new CreateRoleService(new RoleRepositoryInMemory())
);