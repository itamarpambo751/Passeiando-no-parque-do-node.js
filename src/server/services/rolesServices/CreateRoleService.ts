import { StatusCodes } from "http-status-codes";
import { roleCreationInterface } from "../../dtos/RoleDtos";
import { RoleModel } from "../../entities/Role";
import { HttpExceptionErrors } from "../../errors/httpExceptionsErrors";
import { RoleRepositoryInterface } from "../../repositories/RoleRepository";

export class CreateRoleService {
  constructor(private roleRepository: RoleRepositoryInterface) {};

  async execute({ name }: roleCreationInterface) {
    const roleAlreadyExists = await this.roleRepository.findByName(name);

    if (roleAlreadyExists) return new HttpExceptionErrors("Role already exists.", StatusCodes.BAD_REQUEST);

    const role = new RoleModel({ name });

    await this.roleRepository.save(role);
  };
};
