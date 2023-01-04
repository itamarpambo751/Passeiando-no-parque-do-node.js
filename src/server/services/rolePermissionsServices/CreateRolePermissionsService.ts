import { rolePermissionsCreationInterface } from "../../dtos/RolePermissionsDtos";
import { RolePermissionModel } from "../../entities/RolePermissions";
import { HttpExceptionErrors } from "../../errors/httpExceptionsErrors";
import { PermissionRepositoryInterface } from "../../repositories/PermissionRepository";
import { RolePermissionsRepositoryInterface } from "../../repositories/RolePermissionsRepository";
import { RoleRepositoryInterface } from "../../repositories/RoleRepository";

export class CreateRolePermitionsService {
  constructor(
    private rolePermissionsRepository: RolePermissionsRepositoryInterface,
    private permissionsRepository: PermissionRepositoryInterface,
    private roleRepository: RoleRepositoryInterface
  ) {};

  async execute({ role_id, permissions }: rolePermissionsCreationInterface): Promise<number | HttpExceptionErrors> {
    const validPermissions = await this.permissionsRepository.findByIds(permissions);

    if (!Array.isArray(validPermissions))
      return new HttpExceptionErrors("Invalid permissions.", 404);

    const roleExists = await this.roleRepository.findById(role_id);

    if (!roleExists)
      return new HttpExceptionErrors("role doesn´t exists.");

    const rolePermissions = RolePermissionModel.create({role_id, permissions: validPermissions});
    return await this.rolePermissionsRepository.save(rolePermissions);
  };
};
