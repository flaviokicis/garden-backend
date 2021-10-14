

abstract class Scheduler {

    public abstract scheduleTaskOnce(time: string, task: () => void): void;

    public abstract scheduleTask(time: string, task: () => void): void;

}

export default Scheduler;