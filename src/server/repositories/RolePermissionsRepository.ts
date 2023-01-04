import { RolePermissionModel } from "../entities/RolePermissions";
import { HttpExceptionErrors } from "../errors/httpExceptionsErrors";

export interface RolePermissionsRepositoryInterface {
    save(
        rolePermissions :RolePermissionModel
    ): Promise<number | HttpExceptionErrors>;
};