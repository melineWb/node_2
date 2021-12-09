import fs from 'fs';
import config from '../config/properties.config.mjs';

const getActualRequestDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9; //  convert to nanoseconds
    const NS_TO_MS = 1e6; // convert to milliseconds
    const diff = process.hrtime(start);
    return `${((diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS).toLocaleString()} ms`;
};

let logService = (req, res, next) => {
    const now = new Date().toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        hour12: false,
        minute: '2-digit',
        second: '2-digit',
    });
    const duration = getActualRequestDurationInMilliseconds(process.hrtime());
    const body = `Body: ${JSON.stringify(req.body)}`;
    const params = `Params: ${JSON.stringify(req.params)}`;
    const log = `[${now}] ${req.method}:${req.url} ${body} ${params} ${res.statusCode} ${duration}`;

    fs.appendFile(config.logsFolder + config.infoLogFilename, log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });
    next();
};

export default logService;
