const Response = require("../../utils/response");
const models = require("../../config/database");
const Hash = require('../../utils/hash');
const Token = require('../../utils/token');

module.exports = class UserService {
  static async loginUser(data) {
    const { email, password } = data;
    const userExist = await models.User.findOne({ where: { email } });
    console.log(userExist);
    if (!userExist) {
      return Response.serviceResponse(401, 'Invalid email or password.');
    }
    const validPassword = await Hash.compare(password, userExist.password);
    if (!validPassword) {
      return Response.serviceResponse(401, 'Invalid email or password.');
    }
    // create auth session
    const token = await Token.signJWT({ id: userExist.id, email: userExist.email });
    return Response.serviceResponse(200, 'Successfully logged in.', { userExist, token });
  }

  static async registerUser(data) {
    const { email } = data;
    const userExist = await models.User.findOne({ where: { email } });
    if (userExist) {
      return Response.serviceResponse(409, 'User already exist');
    }
    data.password = await Hash.hash(data.password);
    const newUser = await models.User.create(data, { raw: true });
    const token = await Token.signJWT({
      id: newUser.id,
      email: newUser.email
    });
    return Response.serviceResponse(200, 'Successfully registered user.', { newUser, token });
  }
};
