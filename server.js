const express = require('express');
const { SerialPort } = require('serialport');

const { ReadlineParser } = require('@serialport/parser-readline');
const axios = require('axios');
const app = express();

app.get('/api/getweight', (req, res) => {
    let errorOccurred = false;
  
    const port = new SerialPort({
      path: 'COM1',
      baudRate: 9600
    })
  
    port.on('error', (err) => {
      console.error('Serial port error:', err);
      errorOccurred = true;
    });
  
    port.open((err) => {
      if (err) {
        console.error('Error opening port:', err.message);
        return res.status(400).send("machine not connected");
      }
  
      if (errorOccurred) {
        return res.status(500).send("Serial port error occurred");
      }
  
      const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
      parser.on('data', (data) => {
        const weightInGrams = parseFloat(data) * 1000;
        const payload = { data: weightInGrams };
        console.log(payload);
        res.send(payload);
    });
    });
  });
  
  
  
    app.get('/', (req, res) => {
       res.send("node js deployed successfully!!")

    });


    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });



