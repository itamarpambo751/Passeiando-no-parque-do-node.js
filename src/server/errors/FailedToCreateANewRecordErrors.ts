import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpExceptionErrors } from "./httpExceptionsErrors";

type FailedFunctionType = (err: any | HttpExceptionErrors) => RequestHandler;
export const failedToCreateANewRecord: FailedFunctionType = (err) => (_, response, next) => {

    if (err instanceof HttpExceptionErrors) {
        response
            .setHeader("Failed-To-Create-A-New-Record", "X-Error, X-Message")
            .setHeader("X-Error", err.statusCode)
            .setHeader("X-Message", err.message)
            .status(err.statusCode)
            .json({
                message: err.message,
            });
        return next();
    };
    
    response
        .setHeader("Failed-To-Create-A-New-Record", "X-Error, X-Message")
        .setHeader("X-Error", StatusCodes.BAD_REQUEST)
        .setHeader("X-Message", err.message)
        .status(StatusCodes.BAD_REQUEST)
        .json({
            message: err.message || "Unexpected error.",
        });
    return next();
};