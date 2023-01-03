import { Role } from "@prisma/client";
import { RoleModel } from "../entities/Role";

export type findRoleFunctionsReturnsTypes = Role | null;

export interface RoleRepositoryInterface {
    findByName(name: string): Promise<findRoleFunctionsReturnsTypes>;
    save(role: RoleModel): Promise<void>;
};