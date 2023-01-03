import { findRoleFunctionsReturnsTypes, RoleRepositoryInterface } from "../RoleRepository";
import { RoleModel } from "../../entities/Role";
import { prisma } from "../../../client/client";

export class RoleRepositoryInMemory implements RoleRepositoryInterface {
    
    async findByName(name: string): Promise<findRoleFunctionsReturnsTypes> {
       return await prisma.role.findUnique({
        where: { name }
       })
    };

    async save({ name }: RoleModel): Promise<void> {
        await prisma.role.create({
            data: {name}
        });
    };
};