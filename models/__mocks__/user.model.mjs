import SequelizeMock from 'sequelize-mock';
const DBConnectionMock = new SequelizeMock();

console.log('sequelize 2 !!!!!');
const userModel = DBConnectionMock.define(
    'users',
    {
        email: 'email@example.com',
        username: 'blink',
        picture: 'user-picture.jpg',
    },
    {
        instanceMethods: {
            myTestFunc: function () {
                return 'Test User';
            },
        },
    },
);

export default userModel;
