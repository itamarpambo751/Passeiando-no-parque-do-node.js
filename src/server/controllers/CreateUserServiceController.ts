import { Request, Response } from "express";
import { CreateUserservice } from "../services/CreateUserService";
import { StatusCodes } from 'http-status-codes';
import { SqliteUserRepository } from "../repositories/implementations/SqliteUserRepository";

class CreateUserServiceController {
    constructor(private createUserService: CreateUserservice) {};

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        try {
            
            const savedUser = await this.createUserService.execute({
                name,
                email,
                password,
            });

            return response.status(StatusCodes.CREATED).send(savedUser);

        } catch (err: any) {

            return response.status(StatusCodes.BAD_REQUEST).json({

                message: err.message || 'Internal server error.'
            });
        };
    };
};

export const createUserServiceController = new CreateUserServiceController(
    new CreateUserservice(
        new SqliteUserRepository
    )
);