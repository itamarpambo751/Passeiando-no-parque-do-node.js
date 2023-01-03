export class RolePermission {
    role_id: string;
    permission_id: string;
  
    private constructor({ role_id, permission_id }: RolePermission) {
      return Object.assign(this, { role_id, permission_id });
    };
  
    static create({ role_id, permission_id }: RolePermission) {
      return new RolePermission({ role_id, permission_id });
    };
};
