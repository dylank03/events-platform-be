require('dotenv').config()
const axios = require('axios')

const apiKey = process.env.API_KEY

exports.getEvents = (req, res)=>{
    axios.get(`https://www.eventbriteapi.com/v3/organizations/471770883101/events?status=live`, {
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
      .then(({data}) => {
          axios.post(`https://www.eventbriteapi.com/v3/events/${data.id}/ticket_classes/`, {
            "ticket_class": {
              "name": "Free General Admission",
              "description": "General admission ticket for event",
              "quantity_total": 100,
              "free": true
            }
          }, {
            headers: {
              Authorization: `Bearer ${apiKey}`
            }
          }).then(({data})=>{axios.post(`https://www.eventbriteapi.com/v3/events/${data.event_id}/publish/?token=${apiKey}`, {}, {
            headers: {
              Authorization: `Bearer ${apiKey}`
            }
          }).then((response)=>{res.status(response.status).send(response.data)}).catch((err)=>{console.log(err)})
        })
          
      })
      
}

exports.getEvent = (req, res)=>{
  axios.get(`https://www.eventbriteapi.com/v3/events/${req.params.eventId}/`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
    .then((response) => {
      console.log(response)
      res.status(response.status).send(response.data)
    })
    .catch((err)=> {console.log(err)})
}