import ActionType from "../enums/action-type";

export class UserAction {

    user: any;
    action: ActionType;

    constructor(user, action) {
        this.user = user;
        this.action = action;
    }

    public getUser(): any {
        return this.user;
    }

    public getAction(): any {

    }
}
