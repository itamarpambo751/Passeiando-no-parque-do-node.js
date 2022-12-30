import { Router } from "express";
import { createUserServiceController } from "../../server/controllers/CreateUserServiceController";
import { userLoginServicecontroller } from "../../server/controllers/UserLoginServiceController";

const routes = Router();

routes.post('/user',(req, res) => {
    return createUserServiceController.handle(req, res);
});

routes.get('/login',(req, res) => {
    return userLoginServicecontroller.handle(req, res);
});

export { routes };