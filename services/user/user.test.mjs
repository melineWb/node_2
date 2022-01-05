import UserService from './user.service.mjs';
import { jest } from '@jest/globals';

describe('UserService', () => {
    let userServiceData;
    let mockUserModel;
    let users;
    let user1;

    beforeEach(() => {
        user1 = {
            id: 1,
            login: 'testUser',
            password: 'qwer1234',
            age: 27,
            is_deleted: false
        };

        users = [user1];

        mockUserModel = {
            findAll: jest.fn().mockReturnValue(users),
            findByPk: jest.fn().mockImplementation((id) => users.find((el) => el.id === id)),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn()
        };

        userServiceData = new UserService(mockUserModel);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should call findAll method of model and return all users', async () => {
        const data = await userServiceData.findAll();
        expect(mockUserModel.findAll).toHaveBeenCalled();
        expect(data).toEqual(users);
    });

    describe('findById', () => {
        it('should return user with id 1', async () => {
            const data = await userServiceData.findById(1);
            expect(mockUserModel.findByPk).toHaveBeenCalled();
            expect(data).toEqual(user1);
        });

        it('should return return empty data for id 55', async () => {
            const data = await userServiceData.findById(55);
            expect(data).toBeFalsy();
        });
    });

    describe('remove', () => {
        const data = {
            update: (obj) => {
                users.map((el) => {
                    if (el.id === obj.id) {
                        el.is_deleted = true;
                    }

                    return el;
                });
            }
        };

        it('should add flag is_deleted to user with ID = 1', async () => {
            expect(users[0].is_deleted).toEqual(false);

            await userServiceData.remove({ ...data, ...{ id: 1 } });
            expect(users[0].is_deleted).toEqual(true);
        });

        it('should not add flag is_deleted to user if user with ID not exist', async () => {
            expect(users[0].is_deleted).toEqual(false);

            await userServiceData.remove({ ...data, ...{ id: 55 } });
            expect(users[0].is_deleted).toEqual(false);
        });
    });
});
