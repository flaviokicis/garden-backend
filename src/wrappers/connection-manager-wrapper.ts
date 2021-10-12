

abstract class AbstractConnectionManager {

    public abstract update(data: any): void;

    public abstract getGardenersOnline(): Promise<number>;

}

export default AbstractConnectionManager;