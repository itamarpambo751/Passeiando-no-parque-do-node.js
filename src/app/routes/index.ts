import { Router } from "express";
import { permissionsRoutes } from "./permissionsRoutes";
import { rolePermissionsRoutes } from "./rolePermissionsRoutes";
import { rolesRoutes } from "./rolesRoutes";
import { userRoutes } from "./userRoutes";

const routes = Router()

    .use(userRoutes)
    .use(rolesRoutes)
    .use(permissionsRoutes)
    .use(rolePermissionsRoutes)

export { routes };