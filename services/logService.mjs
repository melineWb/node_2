import utilService from './utilsService.mjs';
import logger from '../config/winston.mjs';

let logService = (req, res, next) => {
    const duration = utilService.getActualRequestDurationInMilliseconds();
    const body = `Body: ${JSON.stringify(req.body)}`;
    const params = `Params: ${JSON.stringify(req.params)}`;
    res.on('finish', function (errOnFinish) {
        const log = `[${utilService.getTime()}] ${req.method}:${req.url} ${body} ${params} ${res.statusCode} ${duration}`;
        logger.info(log);
    });

    next();
};

export default logService;
