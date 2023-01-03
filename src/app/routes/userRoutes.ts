import { 
    validateCreateUserserviceSentSchema, 
    createUserServiceController
} from "../../server/controllers/userControllers/CreateUserServiceController";

import {
    userLoginServicecontroller,
    validateUserLoginServiceSentSchema,

} from "../../server/controllers/userControllers/UserLoginServiceController";

import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/user", validateCreateUserserviceSentSchema, (req, res) => {
    return createUserServiceController.handle(req, res);
});

userRoutes.get("/login", validateUserLoginServiceSentSchema, (req, res) => {
    return userLoginServicecontroller.handle(req, res);
});

export { userRoutes };