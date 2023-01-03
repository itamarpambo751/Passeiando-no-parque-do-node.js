import { 
    createRoleServicecontroller, 
    validateCreateRoleServiceSentSchema 
} from "../../server/controllers/roleControllers/CreateRoleServiceController";


import {Router} from "express";

const rolesRoutes = Router();

rolesRoutes.post("/roles", validateCreateRoleServiceSentSchema, (req, res) => {
    return createRoleServicecontroller.handle(req, res);
});

export { rolesRoutes };