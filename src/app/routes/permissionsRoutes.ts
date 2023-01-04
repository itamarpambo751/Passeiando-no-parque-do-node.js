import { Router } from "express";
import { createPermissionServicecontroller, validateCreatePermissionServiceSentSchema } from "../../server/controllers/permissionsControllers/CreatePermissionsServiceController";

const permissionsRoutes = Router();

permissionsRoutes.post("/permissions", validateCreatePermissionServiceSentSchema, (req, res) => {
    return createPermissionServicecontroller.handle(req, res);
});

export { permissionsRoutes };