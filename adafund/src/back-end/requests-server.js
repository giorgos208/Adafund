import express from 'express';
import { promises as fs } from 'fs';
//const fs = require('fs').promises;
//fs = fs.promises
const app = express();
import axios  from 'axios';

import cors from 'cors';
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * (i % 2 === 0 ? 8 : 16));
    color += letters[index];
  }
  return color;
};

async function verifyBlockchain(tx_id, address_to_check, fee) {
  console.log("Just entered verifyBlockchain");
  let tries = 0;
  let shouldContinue = true;

  while (shouldContinue) {
    try {
      const response = await axios.get(`https://cardano-mainnet.blockfrost.io/api/v0/txs/${tx_id}/utxos`, {
        headers: {
          'project_id': "mainnetAXWgU2phwchiCXQmCsNEwBlHT9jM3hFP"
        }
      });

      const utxo_output = response.data.outputs[0];
   //   console.log(utxo_output.address, address_to_check, utxo_output.amount[0].quantity,(fee * 1000 * 1000).toString() )
      if (utxo_output.address === address_to_check && (utxo_output.amount[0].quantity === (fee * 1000 * 1000).toString())) {
        console.log("Paid!");
        return true;
      }
    } catch (error) {
      console.log("Attempt: ",tries, "Will try again in 20 seconds");
    }

    // Check if 10 tries have been reached
    if (tries >= 10) {
      shouldContinue = false;
    } else {
      // Wrap the setTimeout block in a Promise to wait for the delay to complete
      await new Promise(resolve => {
        setTimeout(() => {
          tries += 1;
          resolve(); // Resolve the Promise to continue the execution of the function
        }, 20000);
      });
    }
  }

  return false;
}



async function validate_address (address) {
  const fileContents = await fs.readFile('./src/components/smallBoxesData.json', 'utf-8');
  const jsonData = JSON.parse(fileContents);
  for (const jsonObject of jsonData) {
  
    if (jsonObject.stake_address === address) {

      return (true,jsonObject.id);
    }
  }
  return false;
}


  
  app.get('/api/data', async (req, res) => {
    try {
      const fileContents = await fs.readFile('./src/components/smallBoxesData.json', 'utf-8');
      const jsonData = JSON.parse(fileContents);
      const current_time = new Date();
      let indexToRemove = -1; 
      jsonData.forEach((item) => {
        let date = new Date(item.finish_date)
        if (date > current_time) {
        
        } else {
          indexToRemove = jsonData.findIndex((object) => object.finish_date === item.finish_date);
          console.log("date is on or before current_time. Will be removed");
        }
      });
      if (indexToRemove !== -1) {
        await fs.appendFile('./src/components/expiredRequests.json', JSON.stringify(jsonData[indexToRemove],null, 2));
        jsonData.splice(indexToRemove, 1);
        await fs.writeFile('./src/components/smallBoxesData.json', JSON.stringify(jsonData,null, 2));
      }
      
      res.json(jsonData);
    } catch (error) {
      console.error('Error reading JSON file:', error);
      res.status(500).send('Internal server error');
    }
  });

  app.post('/api/donate', async (req, res) => {
    const { txHash, address, number } = req.body;
    console.log("Processing donation: ",txHash, address, number);
    res.send("Processing donation.");
    const flag = await verifyBlockchain(txHash,address,number);
    if (flag) {
      console.log("Donation has been accepted.")

      const fileContents = await fs.readFile('./src/components/smallBoxesData.json', 'utf-8');
      const jsonData = JSON.parse(fileContents);
      jsonData.forEach((item) => {
        if (item.address === address) {
          item.collected_ada = (parseInt(item.collected_ada) + parseInt(number)).toString() 
        }
      
      });
      await fs.writeFile('./src/components/smallBoxesData.json', JSON.stringify(jsonData,null, 2));
    }
  
    
  });

  app.post('/api/validate', async (req, res) => {
    const data = req.body;
  
    res.send(await validate_address(data.stake_address));
    console.log("Stake_address has been received. Let me check.",await validate_address(data.stake_address));
  
    
  });

app.post('/api/request', async (req, res) => {
  const data = req.body;
  res.send("Data have been received. I will process them.");
  console.log("Data have been received. I will process them.");
  processPOSTrequest(data); 
  
});

async function processPOSTrequest (data) {
// Read the number from file
const last_request = await fs.readFile('./src/back-end/last_request.txt', 'utf-8');


  let num = parseInt(last_request.trim()) || 0;
  num++;

  fs.writeFile('./src/back-end/last_request.txt', num.toString())

  const flag = await verifyBlockchain(data.txHash,"addr1qyywq00rz444qg9uvcsgf2w6uu6fawkvd24x0a9x9yp4vj7kk8w703jmsdn670gugwvz4qjg47vfn4hv6r5n5z74aj5sdp52wc", 1)
  if (flag) {
  const now = new Date();
  const utcTime = now.toUTCString();
  data["start_date"] = utcTime
  now.setDate(now.getDate() + parseInt(data.request_duration));
  data["finish_date"] = now.toUTCString();
  data["collected_ada"] = "0";
  data["id"] = `Request ${last_request}`;
  data["backgroundColor"] = getRandomColor();
  const jsonString = JSON.stringify(data);
  console.log("Request received",jsonString);


  const fileContents = await fs.readFile('./src/components/smallBoxesData.json', 'utf-8');
  const jsonData = JSON.parse(fileContents);
  const newData = JSON.parse(jsonString);
  jsonData.push(newData);
  await fs.writeFile('./src/components/smallBoxesData.json', JSON.stringify(jsonData,null, 2));
}
}
const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
