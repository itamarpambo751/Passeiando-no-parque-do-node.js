import { findRoleFunctionsReturnsTypes, RoleRepositoryInterface } from "../RoleRepository";
import { RoleModel } from "../../entities/Role";
import { prisma } from "../../../client/client";

export class SqliteRoleRepository implements RoleRepositoryInterface {
    
    async findByName(name: string): Promise<findRoleFunctionsReturnsTypes> {
        return prisma.role.create({
            data: {name}
        });
    };

    async save(role: RoleModel): Promise<void> {
        
    };
};