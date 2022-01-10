const mockData = require('../../__mocks__/data');
const { getMockReq, getMockRes } = require('@jest-mock/express');

jest.mock('../../models/user.model.js');
jest.mock('../../services/user.service.js');

jest.mock('../../services/authorization.service.js');
jest.mock('../../services/user.validator.js');

const userController = require('./user.controller.js');
const userService = require('../../services/user.service.js');
const authorizationService = require('../../services/authorization.service.js');
const validateData = require('../../services/user.validator.js');

describe('userController', () => {
    const { res } = getMockRes();
    const req = getMockReq();
    const next = jest.fn();
    let users;
    let user1;

    beforeAll(() => {
        user1 = { ...mockData.user1 };
        users = [...mockData.users];
    });

    beforeEach(() => {
        jest.resetModules();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should call userService with id from params on getUserById', async () => {
        await userController.getUserById(req, res, next, 1);
        expect(userService.findById).toBeCalledWith(1);
    });

    describe('login', () => {
        it('should return token in res', async () => {
            const mockReqWithBody = getMockReq({
                body: {
                    username: 'test',
                    password: 'test'
                }
            });

            jest.spyOn(userService, 'findByCredentials').mockReturnValueOnce(users);
            jest.spyOn(authorizationService, 'login').mockReturnValueOnce('token');

            await userController.login(mockReqWithBody, res, next);
            expect(res.json).toBeCalledWith('token');
        });

        it('should return 403 status if there no user', async () => {
            jest.spyOn(userService, 'findByCredentials').mockReturnValueOnce([]);

            await userController.login(req, res, next);
            expect(res.sendStatus).toBeCalledWith(403);
        });
    });

    describe('getSuggest', () => {
        it('should return suggested users', async () => {
            const mockReqWithBody = getMockReq({
                query: {
                    login: 'test',
                    limit: '3'
                }
            });

            jest.spyOn(userService, 'getAutoSuggestUsers').mockReturnValueOnce(users);

            await userController.getSuggest(mockReqWithBody, res, next);
            expect(res.send).toBeCalledWith(users);
        });

        it('should return empty array if no query params', async () => {
            await userController.getSuggest(req, res, next);
            expect(res.send).toBeCalledWith([]);
        });
    });

    describe('getUsers', () => {
        it('should return users', async () => {
            jest.spyOn(userService, 'findAll').mockReturnValueOnce(users);

            await userController.getUsers(req, res, next);
            expect(res.json).toBeCalledWith(users);
        });

        it('should return error', async () => {
            const errMsg = 'Error on findAll';
            jest.spyOn(userService, 'findAll').mockRejectedValue(errMsg);

            await userController.getUsers(req, res, next);
            expect(next).toBeCalledWith(errMsg);
        });
    });

    it('should return status 200 on getUser', () => {
        userController.getUser(req, res, next);
        expect(res.status).toBeCalledWith(200);
    });

    describe('putUser', () => {
        const reqBody = {
            login: 'updatedLogin'
        };

        const reqData = {
            id: '1'
        };

        const mockedReq = getMockReq({
            params: {
                user_id: '1'
            },
            data: reqData,
            body: reqBody
        });

        const mockedReqToCreate = getMockReq({
            params: {
                user_id: '2'
            },
            data: {},
            body: reqBody
        });

        it('should update existed user', async () => {
            jest.spyOn(userService, 'update').mockReturnValueOnce(user1);

            await userController.putUser(mockedReq, res, next);

            expect(userService.update).toHaveBeenCalledWith(reqBody, reqData);
            expect(res.status).toBeCalledWith(204);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'User with id = 1 successfully updated'
                }),
            );
        });

        it('should return validation error on update', async () => {
            validateData.mockReturnValueOnce({ details: 'Error' });

            await userController.putUser(mockedReq, res, next);

            expect(res.status).toBeCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    errorResponse: 'Error'
                }),
            );
        });

        it('should return validation error on create', async () => {
            validateData.mockReturnValueOnce({ details: 'Error' });

            await userController.putUser(mockedReqToCreate, res, next);

            expect(res.status).toBeCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    errorResponse: 'Error'
                }),
            );
        });

        it('should create user', async () => {
            jest.spyOn(userService, 'create').mockReturnValueOnce(user1);

            await userController.putUser(mockedReqToCreate, res, next);

            expect(res.status).toBeCalledWith(204);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'User with id = 2 successfully created'
                }),
            );
        });
    });

    it('should return 204 status on success deleteUser', async () => {
        const mockReq = getMockReq({
            data: {
                id: '1'
            }
        });

        jest.spyOn(userService, 'remove').mockReturnValueOnce(user1);

        await userController.deleteUser(mockReq, res, next);

        expect(res.status).toBeCalledWith(204);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'User with id = 1 successfully removed'
            }),
        );
    });

    describe('postUser', () => {
        const reqBody = {
            login: 'updatedLogin'
        };

        const reqData = {
            id: '1'
        };

        const mockedReq = getMockReq({
            data: reqData,
            body: reqBody
        });

        it('should create user', async () => {
            jest.spyOn(userService, 'create').mockReturnValueOnce(user1);

            await userController.postUser(mockedReq, res, next);

            expect(userService.create).toHaveBeenCalledWith(reqBody);
            expect(res.status).toBeCalledWith(204);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'User with id = 1 successfully created'
                }),
            );
        });

        it('should return validation error on create', async () => {
            validateData.mockReturnValueOnce({ details: 'Error' });

            await userController.postUser(mockedReq, res, next);

            expect(res.status).toBeCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    errorResponse: 'Error'
                }),
            );
        });
    });
});
