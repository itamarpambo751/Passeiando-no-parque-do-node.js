import { Router } from "express";
import { permitionsRoutes } from "./permissionsRoutes";
import { rolesRoutes } from "./rolesRoutes";
import { userRoutes } from "./userRoutes";

const routes = Router()

    .use(userRoutes)
    .use(rolesRoutes)
    .use(permitionsRoutes);

export { routes };