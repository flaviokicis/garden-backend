import { AnyObject } from "mongoose";
import ResponseWrapper from "../wrappers/response-wrapper";


export default function createError(code: number, message?: string, json?: AnyObject):
    ResponseWrapper {
    return new ResponseWrapper(code, message, json);
}