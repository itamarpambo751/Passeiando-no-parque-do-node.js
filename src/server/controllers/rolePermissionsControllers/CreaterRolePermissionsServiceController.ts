import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpExceptionErrors } from "../../errors/httpExceptionsErrors";
import { validateDataSentFromRequest } from "../../middlewares/validateTheDataSentMiddleware";
import { CreateRolePermitionsService } from "../../services/rolePermissionsServices/CreateRolePermissionsService";
import * as yup from "yup";
import { RolePermissionsRepositoryInMemory } from "../../repositories/in-memory/RolePermissionsRepositoryInMemory";


interface IbodyRequest {
    role_id: string;
    permissions: string[];
};
  
export const validateCreateRolePermitionsServiceSentSchema = validateDataSentFromRequest(
    (getSchema) => ({
      body: getSchema<IbodyRequest>(
        yup.object().shape({
          role_id: yup.string().required().min(30),
          permissions: yup.array()
        })
      ),
    })
);
export class CreateRolePermitionsServiceController {
    constructor(private createRolePermitionsService: CreateRolePermitionsService) {};

    
    async handle(request: Request, response: Response): Promise<Response> {
        console.log("Chegou");

        const { role_id, permissions } = request.body;

        try {
            
            const requestResult = await this.createRolePermitionsService.execute({ role_id, permissions });

            if (requestResult instanceof HttpExceptionErrors)
                return response
                    .status(requestResult.statusCode)
                    .json({
                        message: requestResult.message
                    });
            
            return response
                .status(201)
                .send();

        } catch (err: any) {
            
            return response
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    message: err.message || 'Unexpected error.'
                });
        };
    };
};

export const createRolePermitionsServiceController = new CreateRolePermitionsServiceController(
    new CreateRolePermitionsService(new RolePermissionsRepositoryInMemory())
);