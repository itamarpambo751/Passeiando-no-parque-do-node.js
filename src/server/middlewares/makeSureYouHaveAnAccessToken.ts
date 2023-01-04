import { Request } from "express";
import Jwt from "jsonwebtoken";
type JwtPayload = { id: string };

export const authenticateToken = async (req: Request): Promise<String> => {
    const { authorization } = req.headers;

    const token = authorization?.split(" ")[1];

    const { id } = Jwt.verify(token ?? "", process.env.ACCESS_KEY ?? "") as JwtPayload;

    return id;
};