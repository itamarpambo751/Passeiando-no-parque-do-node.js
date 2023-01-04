import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
    
type FieldTypes = 'body' | 'header' | 'query' | 'params';

type GetSchema = <T>(schema: yup.SchemaOf<T>) => yup.SchemaOf<T>;

type AllSchemas = Record<FieldTypes, yup.SchemaOf<any>>;

type GetAllSchemas = (schema: GetSchema) => Partial<AllSchemas>;

type DataSentFromRequest = (getAllSchemas: GetAllSchemas) => RequestHandler;

export const validateDataSentFromRequest: DataSentFromRequest = (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas(schema => schema);
    
    const reportedErrors: Record<string, Record<string, string>> = {};
    
    Object.entries(schemas).forEach(([key, schema]) => {

        try {
            
            schema.validateSync(req[key as FieldTypes], { abortEarly: false });

        } catch (err: any) {
            
            const yupErrors = err as yup.ValidationError;
            const currentFieldErrors: Record<string, string> = {};

            yupErrors.inner.forEach(error => {
                if (!error.path)
                    return;
                currentFieldErrors[error.path] = error.message; 
            });

            reportedErrors[key] = currentFieldErrors;
        };
    });

    if (Object.entries(reportedErrors).length === 0)
        return next();

    return res.status(StatusCodes.BAD_REQUEST).json({
        error: reportedErrors
    });
};