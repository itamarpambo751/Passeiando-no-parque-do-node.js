import { Router } from "express";
import { createPermitionServicecontroller, validateCreatePermitionServiceSentSchema } from "../../server/controllers/permissionsControllers/CreatePermissionsServiceController";

const permitionsRoutes = Router();

permitionsRoutes.post("/permissions", validateCreatePermitionServiceSentSchema, (req, res) => {
    return createPermitionServicecontroller.handle(req, res);
});

export { permitionsRoutes };