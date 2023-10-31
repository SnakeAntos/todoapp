const { body, validationResult } = require('express-validator');

const createTaskValidation = [
  body('title').trim().notEmpty().withMessage('El título no puede estar vacío'),
  body('title').isLength({ min: 5, max: 50 }).trim().withMessage('La tarea debe tener al menos 10 caracteres (hasta 50)'),
  body('priority_id').isInt().withMessage('La prioridad debe ser un número entero'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() }); 
    }
    next();
  },
];

module.exports = {
  createTaskValidation,
};
