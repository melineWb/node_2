import utilService from './utilsService.mjs';
import logger from '../config/winston.mjs';

const createLogStr = (method, reqUrl, params, statusCode) => {
    const duration = utilService.getActualRequestDurationInMilliseconds();
    return `[${utilService.getTime()}] ${method}:${reqUrl} ${params} ${statusCode} ${duration}`;
};

let logService = (req, res, next) => {
    const body = `Body: ${JSON.stringify(req.body)}`;
    const params = `Params: ${JSON.stringify(req.params)}`;

    res.on('finish', function () {
        const log = createLogStr(req.method, req.url, `${body} ${params}`, res.statusCode);
        if (/^20/.test(res.statusCode)) {
            logger.info(log);
        } else {
            logger.error(createLogStr(req.method, req.url, `${body} ${params}`, res.statusCode));
        }
    });

    next();
};

export default logService;
