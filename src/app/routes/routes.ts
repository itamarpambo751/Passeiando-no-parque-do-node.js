import { Router } from "express";
import { createRoleServicecontroller, validateCreateRoleServiceSentSchema } from "../../server/controllers/roleControllers/CreateRoleServiceController";
import { 
    createUserServiceController, 
    validateCreateUserserviceSentSchema 
} from "../../server/controllers/userControllers/CreateUserServiceController";

import { 
    userLoginServicecontroller, 
    validateUserLoginServiceSentSchema 
} from "../../server/controllers/userControllers/UserLoginServiceController";

const routes = Router();

routes.post("/user", validateCreateUserserviceSentSchema, (req, res) => {
    return createUserServiceController.handle(req, res);
});

routes.get("/login", validateUserLoginServiceSentSchema, (req, res) => {
    return userLoginServicecontroller.handle(req, res);
});


routes.post("/roles", validateCreateRoleServiceSentSchema, (req, res) => {
    return createRoleServicecontroller.handle(req, res);
});

export { routes };