const express = require('express')
const app = express();
const cors = require("cors")
app.use(cors());

app.get('/off', (req,res)=> {

  const mqtt = require('mqtt')

  const host = '192.168.1.11'
  const port = '1883'

  const connectUrl = `mqtt://${host}:${port}`
  const client = mqtt.connect(connectUrl)

  const topic = 'Switch'
  client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topic], () => {
      console.log(`Subscribe to topic '${topic}'`)
    })

  client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
    if (payload.toString()=="OFF"){
      var net = require('net');
      var switch1 = new net.Socket();

      switch1.connect(23, '172.16.0.5', function() {
          console.log('Connected to switch');
          switch1.write('admin\r\nadmin\r\nen\r\nterminal length 0\r\nshow version\r\n');
          // console.log('Output: ')
      });

      switch1.on('data',  
        function(data) {
        console.log('Received:' + data);
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
  
