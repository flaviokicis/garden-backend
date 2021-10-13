import Scheduler from '../garden/entities/scheduler';
import nodeCron from 'node-cron';

class NodeCronScheduler extends Scheduler {

    public scheduleTask(time: string, task: () => void): void {
        // nodeCron.schedule(this.parseTime(time), task);
    }

    private parseTime(time: string): string {
        return "";
    }

}

export default NodeCronScheduler;