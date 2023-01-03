import { RolePermissionsRepositoryInterface } from "../RolePermissionsRepository";
import { prisma } from "../../../client/client";
import { HttpExceptionErrors } from "../../errors/httpExceptionsErrors";
import { RolePermissionModel } from "../../entities/RolePermissions";

export class RolePermissionsRepositoryInMemory
  implements RolePermissionsRepositoryInterface
{
  async bringValidPermissions(
    role_id: string,
    permissions: string[]
  ): Promise<Record<string, string[]> | HttpExceptionErrors> {
    const validCombinations: Record<string, string[]> = {};

    permissions.forEach(async (permission_id) => {
      const registExists = await prisma.rolePermissions.findMany({
        where: {
          role_id,
          permission_id,
        },
      });

      if (!registExists)
        validCombinations["valid_permissions"].push(permission_id);
    });

    if (Object.entries(validCombinations).length === 0)
      return new HttpExceptionErrors(
        "don't have valid permissions for this role, she already has them all."
      );

    return validCombinations;
  };

  async save({role_id, permissions}: RolePermissionModel): Promise<void> {
    console.log("Tentando");
    
    Object.entries(permissions).forEach(async ([ , permission]) => {
      permission.forEach( async permission_id => await prisma.rolePermissions.create({ 
        data: { 
          role_id, permission_id, 
        }, 
      }));
    });

  };

};
