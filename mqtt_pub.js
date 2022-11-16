const express = require('express')
const app = express();
const cors = require("cors")
app.use(cors());

// const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

app.post('/off',()=>{

  // const select = req.body;
  // console.log(select);

  const mqtt = require('mqtt')
  const host = '192.168.1.11'
  const port = '1883'
  const connectUrl = `mqtt://${host}:${port}`
  const client = mqtt.connect(connectUrl)
  //     , {
  //   clientId,
  //   clean: true,
  //   connectTimeout: 4000,
  //   username: 'emqx',
  //   password: 'public',
  //   reconnectPeriod: 1000,
  // })


  // For a single topic
  const topic = 'Switch';
  client.on('connect', () => {
    client.subscribe([topic], () => {
      console.log(`Subscribe to topic '${topic}'`)
    })

    client.publish(topic, 'OFF', { qos: 0, retain: false }, (error) => {
      if (error) {
        console.log(error)
        console.log('Error')
      } 
      else{
        console.log('Connected')
      }
    })
  })

  // For multiple topics in an array
  
  // const topics = ["topic1",
  // "topic2",
  // "topic3"
  // ];  
  // client.on('connect', () => {
  //   respond.send('Connected')
  //   for(var topic=1; topic<topics.length;topic++){
  //     console.log(`${topic} : ${topics[topic]}`)
  //     client.subscribe([topics[topic]], () => {
  //       // Code
  //     })
  //   }
  //   console.log(`Subscribed to topics: ${topics}`)

  //   console.log(`Choose form below topics to publish: `)
  //   for(var topic=1; topic<topics.length;topic++){
  //     console.log(`${topic} : ${topics[topic]}`)
  //   }
  //   var userinput = prompt("Your topic number: ")
  //   client.publish(topics[userinput], 'test message', { qos: 0, retain: false }, (error) => {
  //     if (error) {
  //       response.send(error)
  //     } 
  //     else{
  //       response.send('Connected')
  //     }
  //   })
  // })

  client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
    console.log
  })
  // client.end();
})

app.listen(8080,()=>{
  console.log('port is listening')
})
