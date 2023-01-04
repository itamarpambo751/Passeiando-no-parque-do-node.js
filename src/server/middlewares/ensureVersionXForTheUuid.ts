import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

type ensureUuidVx = (requiredVersion: number, uuid?: string, uuids?: string[]) => RequestHandler;

export const ensureUuidVx: ensureUuidVx = (requiredVersion: number, uuid, uuids) => async (_, response, next) => {
    const deniedIds: Record<number, string> = {};
    let advance = 0;

    const uuid_patterns = {
        1: /^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
        2: /^[0-9A-F]{8}-[0-9A-F]{4}-2[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
        3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
        4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    };
    async function isVersionX(sentUuid: string) {   

        if(typeof sentUuid === "string"){
            if(Object.keys(uuid_patterns).includes(typeof requiredVersion === "string" ? requiredVersion : String(requiredVersion))){
                if (typeof requiredVersion === 'number')
                return uuid_patterns[Number(requiredVersion)].test(sentUuid);
            }
            else
                return Object.values(uuid_patterns).some(pattern => pattern.test(sentUuid));
        };
        return false;
    };

    if (!(uuid || uuids))
        return response
            .setHeader("Missing-Values","X-value-1, X-value-2")
            .setHeader("X-value-1", "uuid")
            .setHeader("X-value-2", "uuis")
            .status(StatusCodes.BAD_REQUEST)
            .json({
                message: "missing values."
            });

    if (uuid) {
        if (!(await isVersionX(uuid))) {

            deniedIds[1] = uuid;
            advance++;
        };
    };
    
    uuids?.forEach(async (uuid, key) => {

        if (!(await isVersionX(uuid)))
            deniedIds[key + advance] = uuid;
    });

    if (Object.entries(deniedIds).length === 0)
        return next();

    return response
        .setHeader("X-Required-uuid-version",`${requiredVersion}`)
        .status(StatusCodes.CONFLICT)
        .json({
            message: `uuid must be version ${requiredVersion}`,
            denied: deniedIds,
        });
};