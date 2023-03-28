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
  data["name"] = `Request ${last_request}`;

  const jsonString = JSON.stringify(data);
  console.log("Request received",jsonString);

  last_request += 1;
  const fileContents = await fs.readFile('./src/components/smallBoxesData.json', 'utf-8');
  const jsonData = JSON.parse(fileContents);
  const newData = JSON.parse(jsonString);
  jsonData.push(newData);
  await fs.writeFile('./src/components/smallBoxesData.json', JSON.stringify(jsonData));
  

  res.send("Data sent");
  
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
