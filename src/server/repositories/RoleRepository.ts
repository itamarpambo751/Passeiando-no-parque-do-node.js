import { Role } from "@prisma/client";
import { RoleModel } from "../entities/Role";

export type findRoleFunctionsReturnsTypes = Role | null;

export interface RoleRepositoryInterface {
    findById(id: string): Promise<Role | null>;
    findByName(name: string): Promise<findRoleFunctionsReturnsTypes>;
    save(role: RoleModel): Promise<void>;
};