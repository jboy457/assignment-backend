const { logger } = require("../../config");
const Response = require("../../utils/response");
const UserService = require("./user_service");

module.exports = {
  login: async (req, res) => {
    try {
      const { status, message, data } = await UserService.loginUser(req.body);
      if (status >= 400) return Response.errorResponseMsg(res, status, message);
      return Response.sessionSuccessResponseMsg(res, status, message, data.token, data.userExist);
    } catch (err) {
      logger.error(err.message);
      return Response.errorResponseMsg(res, 500, 'Something went wrong.');
    }
  },
  register: async (req, res) => {
    try {
      const { status, message, data } = await UserService.registerUser(req.body);
      if (status >= 400) return Response.errorResponseMsg(res, status, message);
      return Response.sessionSuccessResponseMsg(res, status, message, data.token, data.newUser);
    } catch (err) {
      logger.error(err.message);
      return Response.errorResponseMsg(res, 500, 'Something went wrong.');
    }
  }
};
