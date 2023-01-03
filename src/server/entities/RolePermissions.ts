export class RolePermissionModel {
  role_id: string = "";
  permissions: Record<string, string[]> = {};

  private constructor({ role_id, permissions }: RolePermissionModel) {
    return Object.assign(this, { role_id, permissions });
  };

  static create({ role_id, permissions }: RolePermissionModel) {
    return new RolePermissionModel({ role_id, permissions });
  };
};
