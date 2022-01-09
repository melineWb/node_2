const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const config = require('../config/properties.config.js');

class AuthorizationService {
    constructor() {
        dotenv.config();
        this.secret = process.env.TOKEN_SECRET;
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

module.exports = SingletonFactory.getInstance();
