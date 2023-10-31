const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["authorization"];
  
  if (!token) {
    console.log("Token no encontrado en la solicitud");
    return res.status(401).send("Acceso denegado");
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.error("Error al verificar el token:", err);
      return res.status(403).send("Token inválido");
    }

    // Establece el usuario autenticado en el objeto de solicitud
    req.user = user;
    console.log("Usuario autenticado:", user); // Registra el usuario autenticado
    next();
  });
};

module.exports = authenticateToken;
