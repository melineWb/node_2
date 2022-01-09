import { jest } from '@jest/globals';

jest.mock('../../models/user.model.mjs');
jest.mock('../../services/user/user.service.instance.mjs', () => jest.fn());

import userController from './user.controller.mjs';
import userService from '../../services/user/user.service.instance.mjs';

// jest.mock('../../data-access/user.connection.mjs', () => {
//     const mSequelize = {
//         authenticate: jest.fn(),
//         define: jest.fn(),
//     };
//     const actualSequelize = jest.requireActual('sequelize');
//     return { Sequelize: jest.fn(() => mSequelize), DataTypes: actualSequelize.DataTypes };
// });

const validToken = {
    name: 'x-access-token',
    value: 'valid',
};

// const DBConnectionMock = new SequelizeMock();

// const UserDBMock = DBConnectionMock.define('users', {
//     id: '1',
//     login: 'test',
//     password: 'test',
// });

xdescribe('userController', () => {
    let mockReq;
    let mockRes;
    const next = jest.fn();

    beforeAll(() => {
        mockReq = {
            body: {},
        };
        mockRes = {};
    });

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    xdescribe('getUserById', () => {
        xit('should find user by req.params', async () => {
            await userController.getUser(mockReq, mockRes, next, 1);

            expect(userController.getUserById).toBeCalledWith('1');
            expect(res.send).toBeCalledWith({});
        });
    });
});
