const SequelizeMock = require('sequelize-mock');
const DBConnectionMock = new SequelizeMock();
const mockData = require('../../__mocks__/data');

const userModel = DBConnectionMock.define('groups', mockData.groups);
module.exports = userModel;
