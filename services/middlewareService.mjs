import authorizationService from './authorization.service.mjs';

class MiddlewareService {
    authenticateToken(req, res, next) {
        const token = req.headers['x-access-token'];
        if (token === null) return res.sendStatus(401);

        const data = authorizationService.verify(token);

        if (!data.isAuthenticated) {
            return res.sendStatus(403);
        }
        req.user = data.user;
        next();
    }
}

const SingletonFactory = (function createInst() {
    let instance;

    return {
        getInstance() {
            if (!instance) {
                instance = new MiddlewareService();
            }
            return instance;
        }
    };
}());

export default SingletonFactory.getInstance();
