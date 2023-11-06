require("dotenv").config();
module.exports = {
    development: {
      client:  process.env.DB_DRIVER || 'pg',
      connection: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || "Sprint8sample1",
      },
    },
  };
  