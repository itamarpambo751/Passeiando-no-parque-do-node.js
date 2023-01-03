import { HttpExceptionErrors } from "../errors/httpExceptionsErrors";

export interface RolePermissionsRepositoryInterface {
    bringValidCombinations(
        role_id: string, 
        permitions: string[]

    ): Promise<Object | HttpExceptionErrors>;

    save(
        role_id: string, 
        permitions: string[]
        
    ): Promise<void>;
};