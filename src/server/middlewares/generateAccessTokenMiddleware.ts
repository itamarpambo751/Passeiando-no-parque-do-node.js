import { User } from "@prisma/client";
import Jwt from "jsonwebtoken";
import "dotenv";

export const generateToken = async (user: User): Promise<String> => {
    return Jwt.sign({ id: user.id }, process.env.ACCESS_KEY ?? "", { expiresIn: "1h" });
};