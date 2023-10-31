const knex = require("../db/db.js");

const UserModel = {
  createUser(userData) {
    return knex("user").insert({
      email: userData.email,
      password: userData.password,
      nick_name: userData.nick_name,
      is_active: true, 
    });
  },

  findUserByEmail(email) {
    return knex("user").where("email", email).first();
  },
};

module.exports = UserModel;
