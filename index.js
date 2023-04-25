const http = require("http");
const app = require("./src/app");
const { env, logger } = require("./src/config");
const { database } = require("./src/config");

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const PORT = normalizePort(env.app.port) || 4000;
const server = http.createServer(app);

server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? `pipe ${address}` : `port ${PORT}`;
  const log = "[?] connecting...";
  logger.info(`listening on ${bind}`);
  logger.info(log);
  database.sequelize.sync().then(async () => {
    logger.info("Database connected!!");
  });
});

server.listen(PORT);
