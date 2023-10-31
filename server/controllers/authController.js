const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const dotenv = require('dotenv');
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY; 

exports.registerUser = async (req, res) => {
  try {
    const { email, password, nick_name } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await UserModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "El usuario ya existe." });
    }

    // Hashear la contraseña antes de guardarla en la base de datos
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear un nuevo usuario
    const newUser = await UserModel.createUser({
      email: email,
      password: hashedPassword,
      nick_name: nick_name,
    });

    // Generar un token de autenticación
    const token = jwt.sign({ userId: newUser[0], nick_name: newUser[4] }, SECRET_KEY);

    // Enviar el token como respuesta y el nuevo usuario (puedes personalizar la respuesta según tus necesidades)
    res.status(201).json({ token, user: newUser[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar el usuario." });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por su correo electrónico
    const user = await UserModel.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas." });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciales inválidas." });
    }

    const id_user = user.id_user;
    const nick_name = user.nick_name;
    // Generar un token de autenticación
    const token = jwt.sign({ id_user: id_user, nick_name: nick_name }, SECRET_KEY);
   
    const response = { token, user, id_user };
    

    // Enviar el token como respuesta y el usuario (puedes personalizar la respuesta según tus necesidades)
    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión." });
  }
};
