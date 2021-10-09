

abstract class Scheduler {

    public abstract scheduleTask(time: string, task: () => void): void;

}

export default Scheduler;