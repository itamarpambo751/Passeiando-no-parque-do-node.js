import { Request, Response } from "express";
import { HttpExceptionErrors } from "../../errors/httpExceptionsErrors";
import { validateDataSentFromRequest } from "../../middlewares/ensureTheRequestDataInTheRequest";
import { CreateRolePermitionsService } from "../../services/rolePermissionsServices/CreateRolePermissionsService";
import * as yup from "yup";
import { RolePermissionsRepositoryInMemory } from "../../repositories/in-memory/RolePermissionsRepositoryInMemory";
import { PermissionRepositoryInMemory } from "../../repositories/in-memory/PermissionRepositoryInMemory";
import { RoleRepositoryInMemory } from "../../repositories/in-memory/RoleRepositoryInMemory";
import { RolePermissionModel } from "../../entities/RolePermissions";
import { failedToCreateANewRecord } from "../../errors/FailedToCreateANewRecordErrors";
import { ensureUuidVx } from "../../middlewares/ensureVersionXForTheUuid";
import "dotenv";

interface IbodyRequest extends RolePermissionModel {}

export const validateCreateRolePermitionsServiceSentSchema =
  validateDataSentFromRequest((getSchema) => ({
    body: getSchema<IbodyRequest>(
      yup.object().shape({
        role_id: yup.string().uuid().required().min(30),
        permissions: yup.array().of(yup.string().uuid().required()),
      })
    ),
  }));

export class CreateRolePermitionsServiceController {
  constructor(
    private createRolePermitionsService: CreateRolePermitionsService
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { role_id, permissions } = request.body;

    //ensureUuidVx(Number(process.env.UUID_VERSION) ?? 4, role_id, permissions);

    try {
      const requestResult = await this.createRolePermitionsService.execute({
        role_id,
        permissions,
      });

      if (requestResult instanceof HttpExceptionErrors) {
        failedToCreateANewRecord(requestResult);
        return response;
      }

      return response
        .setHeader("X-Records-Inserteds", requestResult)
        .setHeader("X-Records-Not-Inserted", permissions.length - requestResult)
        .status(201)
        .send();
    } catch (err: any) {
      failedToCreateANewRecord(err);
      return response;
    }
  }
}

export const createRolePermitionsServiceController =
  new CreateRolePermitionsServiceController(
    new CreateRolePermitionsService(
      new RolePermissionsRepositoryInMemory(),
      new PermissionRepositoryInMemory(),
      new RoleRepositoryInMemory()
    )
  );
