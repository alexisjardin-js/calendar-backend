//*Rutas de Usuarios
//*host + /api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth.controllers');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { jwtValidator } = require('../middlewares/jwtValidator');

const router = Router();

router.post(
  '/new',
  [
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password debe ser de 6 caracteres').isLength({ min: 6 }),
    fieldValidator,
  ],
  crearUsuario
);

router.post(
  '/',
  [
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password debe ser de 6 caracteres').isLength({ min: 6 }),
    fieldValidator,
  ],
  loginUsuario
);

router.get('/renew', jwtValidator, revalidarToken);

module.exports = router;
