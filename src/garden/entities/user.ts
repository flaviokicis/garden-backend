import moment from "moment";


class GardenUser {

    private id: string;
    private lastSat;

    constructor(id: string) {
        this.id = id;
    }

    public getId() {
        return this.id;
    }

    public sit() {
        this.lastSat = moment().toISOString();
    }

    // Returns how long has been sitting as well
    public standUp(): number {
        if (this.lastSat) {
            const diff = moment(this.lastSat).diff(moment(), 'm');
            this.lastSat = undefined;
            return diff;
        }
        return 0;
    }

}

export default GardenUser;