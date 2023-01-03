import { StatusCodes } from "http-status-codes";
import { permitionCreationInterface } from "../../dtos/PermitionDtos";
import { PermitionModel } from "../../entities/Permition";
import { HttpExceptionErrors } from "../../errors/httpExceptionsErrors";
import { PermitionRepositoryInterface } from "../../repositories/PermitionRepository";

export class CreatePermitionService {
    constructor(private permitionRepository: PermitionRepositoryInterface) {};

    async execute({ name }: permitionCreationInterface) {
        const permitionAlreadyExists = await this.permitionRepository.findByName(name);

        if (permitionAlreadyExists)
            return new HttpExceptionErrors("Permiton already exists.", StatusCodes.BAD_REQUEST);

        const permition = new PermitionModel({name});

        await this.permitionRepository.save(permition);
    };
};