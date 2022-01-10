const mockData = require('../../__mocks__/data');
const { getMockReq, getMockRes } = require('@jest-mock/express');

jest.mock('../../models/group.model.js');
jest.mock('../../services/group.service.js');

const groupController = require('./group.controller');
const groupService = require('../../services/group.service.js');

describe('groupController', () => {
    const { res } = getMockRes();
    const req = getMockReq();
    const next = jest.fn();
    let group1;
    let groups;

    beforeAll(() => {
        group1 = { ...mockData.group1 };
        groups = [...mockData.groups];
    });

    beforeEach(() => {
        jest.resetModules();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should call groupService with id from params on geGroupById', async () => {
        await groupController.geGroupById(req, res, next, 1);
        expect(groupService.findById).toBeCalledWith(1);
    });

    describe('getGroups', () => {
        it('should return users', async () => {
            jest.spyOn(groupService, 'findAll').mockReturnValueOnce(groups);

            await groupController.getGroups(req, res, next);
            expect(res.json).toBeCalledWith(groups);
        });

        it('should return error', async () => {
            const errMsg = 'Error on findAll';
            jest.spyOn(groupService, 'findAll').mockRejectedValue(errMsg);

            await groupController.getGroups(req, res, next);
            expect(next).toBeCalledWith(errMsg);
        });
    });

    it('should return status 200 on getGroup', () => {
        groupController.getGroup(req, res, next);
        expect(res.status).toBeCalledWith(200);
    });

    describe('putGroup', () => {
        const reqBody = {
            name: 'updatedLogin'
        };

        const reqData = {
            id: '1'
        };

        it('should update existed group', async () => {
            jest.spyOn(groupService, 'update').mockReturnValueOnce(group1);
            const mockedReq = getMockReq({
                params: {
                    group_id: '1'
                },
                data: reqData,
                body: reqBody
            });

            await groupController.putGroup(mockedReq, res, next);

            expect(groupService.update).toHaveBeenCalledWith(reqBody, reqData);
            expect(res.status).toBeCalledWith(204);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Group with id = 1 successfully updated'
                }),
            );
        });

        it('should create group', async () => {
            jest.spyOn(groupService, 'create').mockReturnValueOnce(group1);
            const mockedReqToCreate = getMockReq({
                params: {
                    group_id: '2'
                },
                data: {},
                body: reqBody
            });

            await groupController.putGroup(mockedReqToCreate, res, next);

            expect(res.status).toBeCalledWith(204);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Group with id = 2 successfully created'
                }),
            );
        });
    });

    it('should return 204 status on success deleteGroup', async () => {
        const mockReq = getMockReq({
            data: {
                id: '1'
            }
        });

        jest.spyOn(groupService, 'remove').mockReturnValueOnce(group1);

        await groupController.deleteGroup(mockReq, res, next);

        expect(res.status).toBeCalledWith(204);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'Group with id = 1 successfully removed'
            }),
        );
    });

    it('should create group on postGroup', async () => {
        const reqBody = {
            name: 'updatedName'
        };

        const reqData = {
            id: '1'
        };

        const mockedReq = getMockReq({
            data: reqData,
            body: reqBody
        });

        jest.spyOn(groupService, 'create').mockReturnValueOnce(group1);

        await groupController.postGroup(mockedReq, res, next);

        expect(groupService.create).toHaveBeenCalledWith(reqBody);
        expect(res.status).toBeCalledWith(204);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'Group with id = 1 successfully created'
            }),
        );
    });
});
