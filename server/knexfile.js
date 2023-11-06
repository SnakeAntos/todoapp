require("dotenv").config();

module.exports = {
  development: {
    client: process.env.DB_DRIVER,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { 
        require: true,
        rejectUnauthorized: false 
      }
    },
  },
};
