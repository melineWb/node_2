import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import config from '../config/properties.config.mjs';

class AuthorizationService {
    constructor() {
        dotenv.config();
        this.secret = process.env.TOKEN_SECRET || config.secret;
    }

    login(username, password) {
        return jwt.sign(
            {
                username,
                password
            },
            this.secret,
            { expiresIn: config.expiresIn },
        );
    }

    verify(token) {
        return jwt.verify(token, this.secret, (err, data) => {
            if (err || !data) {
                return {
                    isAuthenticated: false
                };
            }
            return {
                isAuthenticated: true,
                user: data.username
            };
        });
    }
}

const SingletonFactory = (function createInst() {
    let instance;

    return {
        getInstance() {
            if (!instance) {
                instance = new AuthorizationService();
            }
            return instance;
        }
    };
}());

export default SingletonFactory.getInstance();
