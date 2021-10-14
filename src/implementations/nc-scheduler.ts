import Scheduler from '../garden/entities/scheduler';
import nodeCron from 'node-cron';
import nodeSchedule from 'node-schedule';
import moment from 'moment';
import Base from 'node-cron';

class NodeCronScheduler extends Scheduler {

    public scheduleTask(time: string, task: () => void): void {
        nodeCron.schedule(this.parseNodeCronTime(time), task);
    }

    public scheduleTaskOnce(time: string, task: () => void): void {
        nodeSchedule.scheduleJob(this.parseNodeScheduleTime(time), task);
    }

    // uses reoccurring format
    private parseNodeCronTime(time: string): string {
        const value = time.split(" ")[0];
        const unit = time.split(" ")[1];
        if (unit.toLowerCase() === 'm') {
            return "*/" + value + " * * * *";
        } else if (unit.toLowerCase() === 'h') {
            return "0 */" + value + " * * *";
        }
        return "";
    }
    
    // uses date
    private parseNodeScheduleTime(time: string): Date {
        const value = parseInt(time.split(" ")[0]);
        const unit = time.split(" ")[1];
        const baseUnit: 'm' | 'h' = (unit.toLowerCase() === 'm' ? 'm' : 'h');
        return moment().add(value, baseUnit).toDate();
    }

}

export default NodeCronScheduler;