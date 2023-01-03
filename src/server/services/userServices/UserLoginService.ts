import { userLoginInterface } from "../../dtos/UserDtos";
import { UserRepositoryInterface } from "../../repositories/UserRepository";

export class UserLoginService {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(data: userLoginInterface) {
    return await this.userRepository.login(data.email, data.password);
  }
}
