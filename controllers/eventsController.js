require('dotenv').config()
const axios = require('axios')

const apiKey = process.env.API_KEY

exports.getEvents = (req, res)=>{
    axios.get(`https://www.eventbriteapi.com/v3/organizations/471770883101/events`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
    .then((response) => {
       res.status(response.status).send(response.data)
    })
    .catch((err)=> {res.send(err)})
}

exports.postEvent = (req, res)=>{
    axios.post(`https://www.eventbriteapi.com/v3/organizations/471770883101/events/?token=${apiKey}`, req.body, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      })
      .then((response) => {
        res.status(response.status).send(response.data)
      })
      .catch((err)=> {res.send(err)})
}

exports.getEvent = (req, res)=>{
  axios.get(`https://www.eventbriteapi.com/v3/events/${req.params.eventId}/`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
    .then((response) => {
      res.status(response.status).send(response.data)
    })
    .catch((err)=> {console.log(err)})
}

