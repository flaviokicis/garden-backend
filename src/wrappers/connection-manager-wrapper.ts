

abstract class AbstractConnectionManager {

    public abstract update(data: any): void;

    public abstract getGardenersOnline(): Promise<number>;

    public abstract delete(data: any): void;

}

export default AbstractConnectionManager;