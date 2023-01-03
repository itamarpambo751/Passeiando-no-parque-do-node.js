import { Router } from "express";
import { createRolePermitionsServiceController, validateCreateRolePermitionsServiceSentSchema } from "../../server/controllers/rolePermissionsControllers/CreaterRolePermissionsServiceController";

export const rolePermissionsRoutes = Router()

    .post("/rolePermissions", validateCreateRolePermitionsServiceSentSchema, (req, res) => {
        return createRolePermitionsServiceController.handle(req, res);
    })