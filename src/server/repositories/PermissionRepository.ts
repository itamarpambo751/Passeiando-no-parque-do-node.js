import { Permission } from "@prisma/client";
import { PermissionModel } from "../entities/Permission";

export type findPermissionFunctionsReturnsTypes = Permission | null;

export interface PermissionRepositoryInterface {
  findByName(name: string): Promise<findPermissionFunctionsReturnsTypes>;
  save(role: PermissionModel): Promise<void>;
}
