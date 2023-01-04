import { Permission } from "@prisma/client";
import { PermissionModel } from "../entities/Permission";

export type findPermissionFunctionsReturnsTypes = Permission | null;

export interface PermissionRepositoryInterface {
  findByIds(ids: string[]): Promise<string[] | null>;
  findByName(name: string): Promise<findPermissionFunctionsReturnsTypes>;
  save(role: PermissionModel): Promise<void>;
};
