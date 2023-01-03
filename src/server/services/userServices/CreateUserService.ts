import { StatusCodes } from "http-status-codes";
import { userCreationInterface } from "../../dtos/UserDtos";
import { UserModel } from "../../entities/User";
import { HttpExceptionErrors } from "../../errors/httpExceptionsErrors";
import { UserRepositoryInterface } from "../../repositories/UserRepository";

export class CreateUserservice {
  constructor(private userRepository: UserRepositoryInterface) {
    //Instantiating repository in creation service
  }

  async execute(data: userCreationInterface) {
    //Checking if the user already exists
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists)
      return new HttpExceptionErrors(
        "User already exists.",
        StatusCodes.BAD_REQUEST
      );
    //Creating a new user if it doesn't exist yet
    const user = new UserModel(data);
    //Saving user and returning saved data with generated id
    return await this.userRepository.save(user);
  }
}
