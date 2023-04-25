/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const db = {};

const {
  name, user, password, host, dialect, port
} = require('./enviroment').database;

const sequelize = new Sequelize(name, user, password, {
  host,
  dialect,
  port,
  logging: false,
  socket: "/Applications/MAMP/tmp/mysql/mysql.sock",
  dialectOptions: {
    // ssl: {
    //   rejectUnauthorized: true
    // }
  }
});

const files = [];
const sortDir = (maniDir) => {
  const folders = [];

  const CheckFile = (filePath) => (fs.statSync(filePath).isFile());
  const sortPath = (dir) => {
    fs
      .readdirSync(dir)
      .filter((file) => (file.indexOf(".") !== 0) && (file !== "index.js"))
      .forEach((res) => {
        const filePath = path.join(dir, res);
        // logger.info(filePath.slice(-8));
        if (CheckFile(filePath)) {
          // logger.info(filePath);
          files.push(filePath);
        } else {
          folders.push(filePath);
        }
      });
    // logger.info(folders);
  };
  folders.push(maniDir);
  let i = 0;
  do {
    sortPath(folders[i]);
    i += 1;
  } while (i < folders.length);
};
sortDir(`${__dirname}/../`);
// files.forEach((file) => { logger.info(file.slice(-8)); });
files
  .filter((file) => file.slice(-8) === 'model.js')
  .forEach((file) => {
    console.log(file)
    const model = require(file)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
