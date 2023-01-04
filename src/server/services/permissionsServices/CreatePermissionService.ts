import { StatusCodes } from "http-status-codes";
import { permissionCreationInterface } from "../../dtos/PermissionDtos";
import { PermissionModel } from "../../entities/Permission";
import { HttpExceptionErrors } from "../../errors/httpExceptionsErrors";
import { PermissionRepositoryInterface } from "../../repositories/PermissionRepository";

export class CreatePermissionService {
  constructor(private permissionRepository: PermissionRepositoryInterface) {}

  async execute({ name }: permissionCreationInterface) {
    const permissionAlreadyExists = await this.permissionRepository.findByName(
      name
    );

    if (permissionAlreadyExists)
      return new HttpExceptionErrors(
        "Permiton already exists.",
        StatusCodes.BAD_REQUEST
      );

    const permission = new PermissionModel({ name });

    await this.permissionRepository.save(permission);
  }
}
