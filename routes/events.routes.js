//*Rutas de Eventos
//*host + /api/events

const { Router } = require('express');
const { jwtValidator } = require('../middlewares/jwtValidator');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { isDate } = require('../helpers/isDate');
const {
  getEvents,
  updateEvents,
  deleteEvent,
  createEvent,
} = require('../controllers/events.controller');

const router = Router();
router.use(jwtValidator);

router.get('/', getEvents);

router.post(
  '/',
  [
    check('title', 'el titulo es obligatorio').not().isEmpty(),
    check('start', 'la fecha de inicio es obligatoria').custom(isDate),
    check('end', 'la fecha de finalización es obligatoria').custom(isDate),
    fieldValidator,
  ],
  createEvent
);

router.put(
  '/:id',
  [
    check('title', 'el titulo es obligatorio').not().isEmpty(),
    check('start', 'la fecha de inicio es obligatoria').custom(isDate),
    check('end', 'la fecha de finalización es obligatoria').custom(isDate),
    fieldValidator,
  ],
  updateEvents
);

router.delete('/:id', deleteEvent);

module.exports = router;
