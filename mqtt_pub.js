const express = require('express')
const app = express();
const cors = require("cors")
app.use(cors());

app.post('/off',()=>{

  const mqtt = require('mqtt')
  const host = '192.168.1.11'
  const port = '1883'
  const connectUrl = `mqtt://${host}:${port}`
  const client = mqtt.connect(connectUrl)

  const topic = 'Switch';
  client.on('connect', () => {
    client.subscribe([topic], () => {
      console.log(`Subscribe to topic '${topic}'`)
    })

    client.publish(topic, 'OFF', { qos: 0, retain: false }, (error) => {
      if (error) {
        console.log(error)
      } 
      else{
        console.log('Connected')
      }
    })
  })

  client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
    console.log
  })
  // client.end();
})

app.listen(8080,()=>{
  console.log('port is listening')
})
