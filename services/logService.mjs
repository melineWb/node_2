import utilService from './utilsService.mjs';
import logger from '../config/winston.mjs';

const createLogStr = (method, reqUrl, params, statusCode) => {
    const duration = utilService.getActualRequestDurationInMilliseconds();
    return `[${utilService.getTime()}] ${method}:${reqUrl} ${params} ${statusCode} ${duration}`;
};

let logService = (req, res, next) => {
    const body = `Body: ${JSON.stringify(req.body)}`;
    const params = `Params: ${JSON.stringify(req.params)}`;

    res.on('finish', function (err) {
        const log = createLogStr(req.method, req.url, `${body} ${params}`, res.statusCode);
        if (!err && /^20/.test(res.statusCode)) {
            logger.info(log);
        } else {
            if (err) {
                logger.error(`[${utilService.getTime()}] logServiceError : ${err.message}`);
            } else {
                logger.error(createLogStr(req.method, req.url, `${body} ${params}`, res.statusCode));
            }
        }
    });

    // res.on('finish', function () {
    //     console.log(`FINISH ${res.statusCode} !!!`);
    // });
    // res.on('done', function () {
    //     const log = `[${utilService.getTime()}] ${req.method}:${req.url} ${body} ${params} ${res.statusCode} ${duration}`;
    //     console.log(`DONE ${res.statusCode} !!!`);

    //     logger.info(log);
    // });

    // res.on('error', function () {
    //     const log = `[${utilService.getTime()}] ${req.method}:${req.url} ${body} ${params} ${res.statusCode} ${duration}`;
    //     console.log(` ERR ${res.statusCode} !!!`);

    //     logger.error(log);
    // });

    next();
};

export default logService;
