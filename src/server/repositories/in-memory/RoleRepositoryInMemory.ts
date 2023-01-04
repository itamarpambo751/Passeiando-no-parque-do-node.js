import { findRoleFunctionsReturnsTypes, RoleRepositoryInterface } from "../RoleRepository";
import { RoleModel } from "../../entities/Role";
import { prisma } from "../../../client/client";
import { Role } from "@prisma/client";

export class RoleRepositoryInMemory implements RoleRepositoryInterface {
    
    async findById(id: string): Promise<Role | null> {
        return await prisma.role.findUnique({where:{id}});  
    };

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