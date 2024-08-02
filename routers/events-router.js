const eventsRouter = require('express').Router()
const {getEvents, postEvent, getEvent} = require('../controllers/eventsController')
const { requireAuth, requireStaff } = require('../middleware/authMiddleware')

eventsRouter.route('/events')
    .get(requireAuth, getEvents)
    .post(requireStaff, postEvent)

eventsRouter.route('/event/:eventId')
    .get(getEvent)

module.exports = eventsRouter