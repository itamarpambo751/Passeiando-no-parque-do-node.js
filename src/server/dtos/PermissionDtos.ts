import { PermissionModel } from "../entities/Permission";

export interface permissionCreationInterface extends Omit<PermissionModel, "id">{};