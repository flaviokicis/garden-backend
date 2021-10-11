import { Response } from "express";


class ClientWrapper {

    private connectionId: string;

    private response: Response;

    private ipAddress;

    constructor(id: string, response: Response, ipAddress) {
        this.connectionId = id;
        this.response = response;
        this.ipAddress = ipAddress;
    }

    public getConnectionId(): string {
        return this.connectionId;
    }

    public getResponse() {
        return this.response;
    }

    public getIPAddress() {
        return this.ipAddress;
    }

}

export default ClientWrapper;