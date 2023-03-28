const axios = require('axios');

function sendGETrequest() {
    
axios.get('http://localhost:5000/api/data')
.then(response => {
  console.log('Data received from server:', response.data);
})
.catch(error => {
  console.error('Error fetching data from server:', error);
});
}

function sendPOSTrequest(text) {
    const data = {
        text
    };
    
    axios.post('http://localhost:5000/api/data', data)
      .then(response => {
        console.log()
        console.log(response.data); 
        console.log() 
      })
      .catch(error => {
        console.error(error);
      });
    }

sendPOSTrequest("ep")
sendGETrequest()