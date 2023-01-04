import { RolePermissionsRepositoryInterface } from "../RolePermissionsRepository";
import { prisma } from "../../../client/client";
import { Prisma } from "@prisma/client";
import { HttpExceptionErrors } from "../../errors/httpExceptionsErrors";
import { RolePermissionModel } from "../../entities/RolePermissions";

export class RolePermissionsRepositoryInMemory
  implements RolePermissionsRepositoryInterface
{
  async bringValidPermissions(
    role_id: string,
    permissions: string[]
  ): Promise<string[] | HttpExceptionErrors> {

    const returnedIds: string[] = [];
      
    const registExists = await prisma.rolePermissions.findMany({
      where: { role_id },select: {
        permission: {
          select: {
            id: true
          }
        }
      }
    });
      
    registExists.forEach(object => returnedIds.push(object.permission.id));

    const valids = permissions.filter(permission => !returnedIds.includes(permission));
    
    if (valids.length > 0)
      return valids;

    return new HttpExceptionErrors("We found no valid permissions for this role.");
  };

  async save({role_id, permissions}: RolePermissionModel): Promise<number | HttpExceptionErrors> {

    permissions.forEach( async permission_id => {
      await prisma.rolePermissions.create({ 
        data: { 
          role_id, permission_id, 
        }, 
      })
    }); 
    
    return permissions.length;
  };
};
