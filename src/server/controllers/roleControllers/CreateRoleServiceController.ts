import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpExceptionErrors } from "../../errors/httpExceptionsErrors";
import { CreateRoleService } from "../../services/rolesServices/CreateRoleService";
import * as yup from "yup";
import { validateDataSentFromRequest } from "../../middlewares/validateTheDataSentMiddleware"
import { SqliteRoleRepository } from "../../repositories/implementations/RoleRepositoryImplementation";

interface IbodyRequest {
    name: string;
};
  
export const validateCreateRoleServiceSentSchema = validateDataSentFromRequest((getSchema) => ({
    body: getSchema<IbodyRequest>(yup.object().shape({
        name: yup.string().required().min(3)
    })),
}));

export class CreateRoleServiceController {
    constructor(private createRoleService: CreateRoleService) {};

    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.body;

        try {
            
            const result = await this.createRoleService.execute({ name });

            if (result instanceof HttpExceptionErrors)
                return response.status(result.statusCode).json({ message: result.message });

            return response.status(StatusCodes.CREATED).send();

        } catch (err: any) {

            return response.status(StatusCodes.BAD_REQUEST).json({
                message: err.message || "Unexpected error."
            });  
        };
    };
};

export const createRoleServicecontroller = new CreateRoleServiceController(
    new CreateRoleService(
        new SqliteRoleRepository
    )
);