import { StatusCodes } from "http-status-codes";
import { permissionCreationInterface } from "../../dtos/PermissionDtos";
import { PermissionModel } from "../../entities/Permission";
import { HttpExceptionErrors } from "../../errors/httpExceptionsErrors";
import { PermissionRepositoryInterface } from "../../repositories/PermissionRepository";

export class CreatePermitionService {
  constructor(private permitionRepository: PermissionRepositoryInterface) {}

  async execute({ name }: permissionCreationInterface) {
    const permitionAlreadyExists = await this.permitionRepository.findByName(
      name
    );

    if (permitionAlreadyExists)
      return new HttpExceptionErrors(
        "Permiton already exists.",
        StatusCodes.BAD_REQUEST
      );

    const permition = new PermissionModel({ name });

    await this.permitionRepository.save(permition);
  }
}
