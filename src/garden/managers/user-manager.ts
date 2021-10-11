import GardenUser from "../entities/user";


class UserManager {

    private usersMap: Map<string, GardenUser> = new Map();

    public addUser(user: GardenUser) {
        this.usersMap.set(user.getId(), user);
    }

    public hasUser(id: string) {
        return this.usersMap.has(id);
    }

    public getUser(id: string) {
        return this.usersMap.get(id);
    }

    public removeUser(id: string) {
        return this.usersMap.delete(id);
    }

}

export default new UserManager();