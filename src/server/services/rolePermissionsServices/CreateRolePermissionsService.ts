import { rolePermissionsCreationInterface } from "../../dtos/RolePermissionsDtos";
import { RolePermissionsRepositoryInterface } from "../../repositories/RolePermissionsRepository";

export class CreateRolePermitionsService {
  constructor(
    private rolePermitionsRepository: RolePermissionsRepositoryInterface
  ) {}

  async execute({ role_id, permissions }: rolePermissionsCreationInterface) {}
}
