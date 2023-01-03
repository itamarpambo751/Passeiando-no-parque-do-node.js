import { rolePermissionsCreationInterface } from "../../dtos/RolePermissionsDtos";
import { RolePermissionModel } from "../../entities/RolePermissions";
import { HttpExceptionErrors } from "../../errors/httpExceptionsErrors";
import { RolePermissionsRepositoryInterface } from "../../repositories/RolePermissionsRepository";

export class CreateRolePermitionsService {
  constructor(
    private rolePermissionsRepository: RolePermissionsRepositoryInterface
  ) {}

  async execute({ role_id, permissions }: rolePermissionsCreationInterface) {
    const validPermissions =
      await this.rolePermissionsRepository.bringValidPermissions(
        role_id,
        permissions
      );

    if (validPermissions instanceof HttpExceptionErrors)
      return validPermissions;

    const rolePermissions = RolePermissionModel.create({role_id, permissions: validPermissions});
    await this.rolePermissionsRepository.save(rolePermissions);
  };
};
