module.exports = {
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
    serviceCharge: process.env.SERICE_CHARGE || 0.1,
    referralCap: process.env.REFERRAL_CAP,
    referralBonus: process.env.REFERRAL_BONUS,
    frontendUrl: process.env.FRONTEND_URL || 'https://solaceimaging.com',
    localUrl: process.env.LOCALHOST_URL || 'http://localhost:3001'
  },
  database: {
    dialect: process.env.DB_DIALECT || 'mysql',
    user: process.env.DB_USER || 'root',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 27017,
    name: process.env.DB_NAME || 'db',
    password: process.env.DB_PASSWORD
  },
  development: {
    dialect: process.env.DB_DIALECT || 'mysql',
    user: process.env.DB_USER || 'root',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_NAME || 'root',
    database: "radio",
    password: process.env.DB_PASSWORD || 'password'
  },
  auth: {
    jwt_secret: process.env.JWT_SECRET || 'sfajsdhfkadjhfakdjf'
  }
};
