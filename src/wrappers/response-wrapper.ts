import { AnyObject } from "mongoose";


export default class ResponseWrapper {

    private errorCode;
    private message;
    private json;

    constructor(errorCode: number, message?: string, json?: AnyObject) {
        this.errorCode = errorCode;
        this.message = message;
        this.json = json;
    }

}