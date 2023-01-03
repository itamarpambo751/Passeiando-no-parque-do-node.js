import { findPermitionFunctionsReturnsTypes, PermitionRepositoryInterface } from "../PermitionRepository";
import { PermitionModel } from "../../entities/Permition";
import { prisma } from "../../../client/client";

export class SqlitePermitionRepository implements PermitionRepositoryInterface {
    
    async findByName(name: string): Promise<findPermitionFunctionsReturnsTypes> {
       return await prisma.permition.findUnique({
        where: { name }
       })
    };

    async save({ name }: PermitionModel): Promise<void> {
        await prisma.role.create({
            data: {name}
        });
    };
};