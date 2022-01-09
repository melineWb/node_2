import UserService from '../../services/user/user.service.mjs';
import userModel from '../../models/user.model.mjs';

export default new UserService(userModel);
