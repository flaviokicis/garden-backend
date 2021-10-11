

class GardenUser {

    private id: string;
    private nickname: string;

    constructor(id: string, nickname: string) {
        this.id = id;
        this.nickname = nickname;
    }

    public getId() {
        return this.id;
    }

    public getNickname() {
        return this.nickname;
    }

}

export default GardenUser;