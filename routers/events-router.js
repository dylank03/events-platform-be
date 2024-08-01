const eventsRouter = require('express').Router()
const {getEvents, postEvent} = require('../controllers/eventsController')

eventsRouter.route('/events')
    .get(getEvents)
    .post(postEvent)

module.exports = eventsRouter