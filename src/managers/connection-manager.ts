import GardenUser from "../garden/entities/user";
import gardenManager from "../garden/managers/garden-manager";
import userManager from "../garden/managers/user-manager";
import Logger from "../logger/winston-logger";
import GardenConfig from "../main/config";
import ClientWrapper from "../wrappers/client-wrapper";
import AbstractConnectionManager from "../wrappers/connection-manager-wrapper";


class ConnectionManager extends AbstractConnectionManager {

    private connectionMap: Map<string, ClientWrapper> = new Map();

    constructor() {
        super();
        gardenManager.setConnectionManager(this);
    }

    public async register(client: ClientWrapper): Promise<boolean> {
        if (GardenConfig.users.max_users <= this.connectionMap.size) {
            return false;
        }
        userManager.addUser(new GardenUser(client.getConnectionId()));
        this.connectionMap.set(client.getConnectionId(), client);
        const data = await gardenManager.getGardenState();
        data["playersOnline"] = await this.getGardenersOnline();
        const updateObject = {};
        updateObject["eventType"] = "handshake";
        updateObject["data"] = data;
        const clientData = `data: ${JSON.stringify(updateObject)}\n\n`;
        client.getResponse().write(clientData);
        return true;
    }

    public async update(data) {
        const updateObject = {};
        updateObject["eventType"] = "update";
        updateObject["data"] = data;
        const clientData = `data: ${JSON.stringify(updateObject)}\n\n`;
        for (let wrapper of this.connectionMap.values()) {
            const response = wrapper.getResponse();
            response.write(clientData);
        }
    }

    public async isConnected(id: string) {
        return this.connectionMap.has(id);
    }

    public async disconnect(id: string) {
        Logger.info(`${id} Connection closed`);
        userManager.removeUser(id);
        this.connectionMap.delete(id);
        if (process.env.ENV_TYPE === 'DEV')
        Logger.info("Active Connections: " + this.connectionMap.size);
    }

    public async getGardenersOnline(): Promise<number> {
        return this.connectionMap.size;
    }
    
}

export default new ConnectionManager();