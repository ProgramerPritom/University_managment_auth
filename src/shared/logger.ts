import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf,prettyPrint } = format;
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return `${date.toDateString()} ${hour} : ${minute} : ${second} [${label}] ${level}: ${message}`;
  });
 
const logger = createLogger({
    level: 'info',
    format: combine(
        label({ label: 'Info Message' }),
        timestamp(),
        myFormat,prettyPrint()
      ),
    transports: [
      new transports.Console(),
       new DailyRotateFile({
        filename: path.join(process.cwd(), 'logs','winston','successes','UM-success-%DATE%.log'),
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
    })
    ],
  });

  
const errorlogger = createLogger({
    level: 'error',
    format: combine(
        label({ label: 'Error Message' }),
        timestamp(),
        myFormat,prettyPrint()),
    transports: [
      new transports.Console(),
       new DailyRotateFile({
        filename: path.join(process.cwd(), 'logs','winston','errors','UM-error-%DATE%.log'),
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
    })

    ],
  });

  export  {logger,errorlogger};