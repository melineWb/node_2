const utilService = require('./utilsService.js');
const logger = require('../config/winston.js');

const createLogStr = (method, reqUrl, params, statusCode) => {
    const duration = utilService.getActualRequestDurationInMilliseconds();
    return `[${utilService.getTime()}] ${method}:${reqUrl} ${params} ${statusCode} ${duration}`;
};

const logService = (req, res, next) => {
    const body = `Body: ${JSON.stringify(req.body)}`;
    const params = `Params: ${JSON.stringify(req.params)}`;

    res.on('finish', () => {
        const log = createLogStr(req.method, req.url, `${body} ${params}`, res.statusCode);
        if (/^20/.test(res.statusCode)) {
            logger.info(log);
        } else {
            logger.error(createLogStr(req.method, req.url, `${body} ${params}`, res.statusCode));
        }
    });

    next();
};

module.exports = logService;
