import { Router } from "express";
import { createUserServiceController, validateCreateUserserviceSentSchema } from "../../server/controllers/CreateUserServiceController";
import { userLoginServicecontroller, validateUserLoginServiceSentSchema } from "../../server/controllers/UserLoginServiceController";

const routes = Router();

routes.post('/user', validateCreateUserserviceSentSchema, (req, res) => {
    return createUserServiceController.handle(req, res);
});

routes.get('/login', validateUserLoginServiceSentSchema, (req, res) => {
    return userLoginServicecontroller.handle(req, res);
});

export { routes };