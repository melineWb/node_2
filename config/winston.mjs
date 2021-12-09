import appRoot from 'app-root-path';
import winston from 'winston';

const options = {
    info: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        level: 'debug',
        handleExceptions: true,
    },
    error: {
        level: 'error',
        filename: `${appRoot}/logs/error.log`,
        prepend: true,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
};

var logger = winston.createLogger({
    transports: [new winston.transports.File(options.error), new winston.transports.File(options.info)],
    exitOnError: false,
});

export default logger;
