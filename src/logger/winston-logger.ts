import winston, { format, transports, Logger } from 'winston';
const { combine, splat, timestamp, printf } = format;
import moment from 'moment';
// Set Format Options

const formatOptions = printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}] : ${message} `
    return msg
});
// Create Winston Logger
const Logger: Logger = winston.createLogger({
    format: combine(
        format.colorize(),
        splat(),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss:ms'
        }),
        formatOptions
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'logs/' +
                moment().format("YYYY-MM-DD")
                + '.log'
        })
    ]
});
export default Logger;

