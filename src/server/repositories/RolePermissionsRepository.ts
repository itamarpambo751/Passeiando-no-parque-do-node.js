import { RolePermissionModel } from "../entities/RolePermissions";
import { HttpExceptionErrors } from "../errors/httpExceptionsErrors";

export interface RolePermissionsRepositoryInterface {
    bringValidPermissions(
        role_id: string, 
        permitions: string[]

    ): Promise<string[] | HttpExceptionErrors>;

    save(
        rolePermissions :RolePermissionModel
        
    ): Promise<void>;
};