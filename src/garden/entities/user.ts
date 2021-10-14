import moment from "moment";


class GardenUser {

    private id: string;
    private lastSat;
    private nickname: string;

    constructor(id: string, nickname: string) {
        this.id = id;
        this.nickname = nickname;
    }

    public getId(): string {
        return this.id;
    }

    public getNickname(): string {
        return this.nickname;
    }

    public sit() {
        this.lastSat = moment().toISOString();
    }

    // Returns how long has been sitting as well
    public standUp(): number {
        if (this.lastSat) {
            const diff = moment().diff(moment(this.lastSat), 'm');
            this.lastSat = undefined;
            return diff;
        }
        return 0;
    }

}

export default GardenUser;