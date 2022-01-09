const SequelizeMock = require('sequelize-mock');
const DBConnectionMock = new SequelizeMock();

console.log('sequelize 2 !!!!!');
const userModel = DBConnectionMock.define(
    'users',
    {
        email: 'email@example.com',
        username: 'blink',
        picture: 'user-picture.jpg'
    },
    {
        instanceMethods: {
            myTestFunc() {
                return 'Test User';
            }
        }
    },
);

module.exports = userModel;
