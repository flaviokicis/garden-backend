import gardenManager from "../garden/managers/garden-manager";
import Logger from "../logger/winston-logger";
import GardenConfig from "../main/config";
import ClientWrapper from "../wrappers/client-wrapper";


class ConnectionManager {

    private connectionMap: Map<string, ClientWrapper> = new Map();

    constructor() {
        gardenManager.registerListener(this.update);
    }

    public async register(client: ClientWrapper): Promise<boolean> {
        if (GardenConfig.users.max_users >= this.connectionMap.size) {
            return false;
        }

        this.connectionMap.set(client.getConnectionId(), client);
        return true;
    }

    public async update(data) {
        const updateObject = {};
        updateObject["eventType"] = "update";
        updateObject["updateData"] = data;
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
        this.connectionMap.delete(id);
        if (process.env.ENV_TYPE === 'DEV')
        Logger.info("Active Connections: " + this.connectionMap.size);
    }
    
}

export default new ConnectionManager();