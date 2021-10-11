

export default class ResponseWrapper {

    private errorCode: number;
    private message: string;
    private json: Object;
    private carryOn: boolean = true;

    constructor(errorCode: number, message?: string, json?: Object, carryOn?: boolean) {
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

    public getJson(): Object {
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