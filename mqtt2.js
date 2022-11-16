const express = require('express')
const app = express();
const cors = require("cors")
app.use(cors());

app.get('/off', (req,res)=> {

  const mqtt = require('mqtt')
  // const prompt = require('prompt-sync')();

  const host = '192.168.1.11'
  const port = '1883'
  // const clientID = `mqtt_${Math.random().toString(16).slice(3)}`

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

  // ##############To subscribe to a single topic#################

  const topic = 'Switch'
  client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topic], () => {
      console.log(`Subscribe to topic '${topic}'`)
    })
  // client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
  //   if (error) {
  //     console.error(error)
  //   }
  // })

  // ##############To subscribe to multiple topics#################

  // const topics = [
  //   "Restart", 
  //   "Shutdown", 
  //   "Show Running Configuration", 
  //   "Show ip routes", 
  //   "Show ip info", 
  //   "Show vlan info",
  //   "Coffeemaker"
  // ];
  // var messages = [
  //   "Restarted", 
  //   "Shut down", 
  //   "Running Configuration", 
  //   "IP routes", 
  //   "IP info", 
  //   "VLAN info"
  // ];
  // client.on('connect', () => {
  //   console.log('Connected')
  //   for(var topic=1;topic<topics.length;topic++){
  //     console.log(`${topic} : ${topics[topic]}`)
  //     client.subscribe([topics[topic]], () => {
  //     // Code
  //     })
  //   }
  //   console.log(`Subscribed to topics: ${topics}`)

    // console.log(`Choose from below topics to publish: `)
    // for(var topic=1;topic<topics.length;topic++){
    //   console.log(`${topic} : ${topics[topic]}`)
    // }
    // var userinput = prompt("Your Choice: ")
    // client.publish(topics[userinput], messages[userinput], { qos: 0, retain: false }, (error) => {
    //   if (error) {
    //     console.error(error)
    //   }
    // })
  })

  //########################################################

  client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
    if (payload.toString()=="OFF"){
      var net = require('net');
      var switch1 = new net.Socket();

      // function sleep(ms) {
      //   return new Promise((resolve) => {
      //     setTimeout(resolve, ms);
      //   });
      // }

      switch1.connect(23, '172.16.0.5', function() {
          console.log('Connected to switch');
          switch1.write('admin\r\nadmin\r\nen\r\nterminal length 0\r\nshow version\r\n');
          // console.log('Output: ')
      });

      switch1.on('data',  
        function(data) {
        console.log('Received:' + data);
        // return res.send(data.toString())
        // switch1.destroy(); // kill client after server's response
        }
      );
      
      switch1.on('close', function() {
        console.log('Connection closed');
      });
    }
    // client.end()
  })
})

app.listen(8080,()=>{
  console.log('port is listening')
  })
  