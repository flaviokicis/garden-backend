import { AnyObject } from "mongoose";


export default class ResponseWrapper {

    private errorCode: number;
    private message: string;
    private json: AnyObject;
    private carryOn: boolean;

    constructor(errorCode: number, message?: string, json?: AnyObject, carryOn?: boolean) {
        this.errorCode = errorCode;
        this.message = message as string;
        this.json = json as object;
        this.carryOn = carryOn as boolean;
    }

    public getErrorCode(): number {
        return this.errorCode;
    }

    public getMessage(): string {
        return this.message;
    }

    public getJson(): AnyObject {
        return this.json;
    }

    public getCarryOn(): boolean {
        return this.carryOn;
    }

    public toResponse() {
        return {
            error: this.errorCode,
            message: (this.message ? this.message : ""),
            json: (this.json ? this.json : "")
        }
    }

}