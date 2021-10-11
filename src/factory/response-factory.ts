import ResponseWrapper from "../wrappers/response-wrapper";


export default function createResponse(code: number, message?: string, json?: Object):
    ResponseWrapper {
    return new ResponseWrapper(code, message, json);
}