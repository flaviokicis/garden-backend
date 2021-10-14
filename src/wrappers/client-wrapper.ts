import { Response } from "express";


class ClientWrapper {

    private connectionId: string;

    private response: Response;

    private nickname: string;

    private ipAddress: string;

    constructor(id: string, response: Response, ipAddress: string, nickname: string) {
        this.connectionId = id;
        this.response = response;
        this.nickname = nickname;
        this.ipAddress = ipAddress;
    }

    public getConnectionId(): string {
        return this.connectionId;
    }

    public getResponse() {
        return this.response;
    }

    public getNickname(): string {
        return this.nickname;
    }

    public getIPAddress(): string {
        return this.ipAddress;
    }

}

export default ClientWrapper;