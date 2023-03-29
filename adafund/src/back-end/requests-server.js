const express = require('express');
const fs = require('fs').promises;
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
last_request = 1

const exampleData = [
    { id: 1, text: 'Sample data 1' },
    { id: 2, text: 'Sample data 2' },
    { id: 3, text: 'Sample data 3' },
  ];
  
  app.get('/api/data', async (req, res) => {
    try {
      const fileContents = await fs.readFile('./src/components/smallBoxesData.json', 'utf-8');
      const jsonData = JSON.parse(fileContents);
      res.json(jsonData);
    } catch (error) {
      console.error('Error reading JSON file:', error);
      res.status(500).send('Internal server error');
    }
  });

app.post('/api/data', async (req, res) => {
  const data = req.body;
  res.send("Data have been received. I will process them.");
  console.log("Data have been received. I will process them.");
  processPOSTrequest(data); 
  
});

async function processPOSTrequest (data) {
  //await verifyBlockchain(data.tx)
  const now = new Date();
  const utcTime = now.toUTCString();
  data["start_date"] = utcTime
  now.setDate(now.getDate() + parseInt(data.request_duration));
  data["finish_date"] = now.toUTCString();
  data["id"] = `Request ${last_request}`;
  //to be removed
  data["address"] = "addr1qx7ryxl47an2st42m5mdflx0aepnejjkjckzsvruk88kcfhnmq44f03kr5866dmw3x6x0xy7htr5wmg3l3tpaq3yl3tqg808kx"

  const jsonString = JSON.stringify(data);
  console.log("Request received",jsonString);

  last_request += 1;
  const fileContents = await fs.readFile('./src/components/smallBoxesData.json', 'utf-8');
  const jsonData = JSON.parse(fileContents);
  const newData = JSON.parse(jsonString);
  jsonData.push(newData);
  await fs.writeFile('./src/components/smallBoxesData.json', JSON.stringify(jsonData));
}

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
