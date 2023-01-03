import { Permition } from "@prisma/client";
import { PermitionModel } from "../entities/Permition";

export type findPermitionFunctionsReturnsTypes = Permition | null;

export interface PermitionRepositoryInterface {
    findByName(name: string): Promise<findPermitionFunctionsReturnsTypes>;
    save(role: PermitionModel): Promise<void>;
};