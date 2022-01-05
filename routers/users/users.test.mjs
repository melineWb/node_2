import express from 'express';
import { jest } from '@jest/globals';
import request from 'supertest';
import userModel from '../../models/user.model.mjs';

import usersRouter from './users.mjs';

const validToken = {
    name: 'x-access-token',
    value: 'valid'
};

jest.mock('../../services/authorization.service.mjs', () => {
    return jest.fn().mockImplementation(() => {
        return {
            verify: jest.fn().mockImplementation((token) => {
                return token === validToken.value;
            })
        };
    });
});

jest.mock('../../services/middlewareService.mjs', () => {
    return jest.fn().mockImplementation(() => {
        return {
            findAll: jest.fn().mockImplementation(() => []),
            getAutoSuggestUsers: jest.fn()
        };
    });
});

jest.mock('../../services/user.validator.mjs', () => {
    return jest.fn().mockImplementation(() => true);
});

jest.mock(userModel, () => {
    const mSequelize = {
        authenticate: jest.fn(),
        define: jest.fn()
    };
    const actualSequelize = jest.requireActual('sequelize');
    return { Sequelize: jest.fn(() => mSequelize), DataTypes: actualSequelize.DataTypes };
});

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use('/', usersRouter);

describe('usersRouter', () => {
    beforeAll((done) => {
        done();
    });

    afterAll((done) => {
        jest.clearAllMocks();
        userModel.sequelize.close();
        done();
    });

    describe('UserService', () => {
        xit('should "/users" and return users array', (done) => {
            request(app).get('/users').set(validToken.name, validToken.value).expect(200, done);
        });

        it('should "/users" and return 403 if token not valid', (done) => {
            request(app).get('/users').set(validToken.name, 'notValid').expect(403, done);
        });

        it('should "/users" and return 401 if token empty', (done) => {
            request(app).get('/users').expect(401, done);
        });
    });
});
