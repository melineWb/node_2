import appRoot from 'app-root-path';
import winston from 'winston';

const options = {
    info: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false
    },
    error: {
        level: 'error',
        filename: `${appRoot}/logs/error.log`,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false
    }
};

const logger = winston.createLogger({
    transports: [new winston.transports.File(options.error), new winston.transports.File(options.info)],
    exitOnError: false
});

export default logger;
