require('dotenv').config();

const express = require("express")
var cors = require('cors')
const axios = require("axios");

const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())


const sendToDiscord = async (message) => {
  try{
    await axios.post(process.env.DISCORD, message)
  }catch(e){
    console.log(e)
  }
}

app.post('/work-item-created', function (req, res) {
    res.send('POST request to azure');
    const message = {
      username: "Azure Webhook",
      avatar_url: "https://azurementor.files.wordpress.com/2017/10/azure-logo.jpg",
      content: `${req.body.detailedMessage.markdown} \r\n\r\n`,
    }
    sendToDiscord(message);
  });

  
app.listen(PORT, () => console.log(`Server on port ${PORT}`))
