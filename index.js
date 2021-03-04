const express = require("express")
const axios = require("axios");

var cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000;
app.use(cors())
app.use(express.json())


const sendToDiscord = async () => {
  await axios.post(process.env.DISCORD, message)
}


app.post('/azure', function (req, res) {
    res.send('POST request to azure');
    const message = {
      "username": "Webhook",
      "avatar_url": "https://i.imgur.com/4M34hi2.png",
      "content": "Text message. Up to 2000 characters.",
    }
    sendToDiscord(message);
  });


  
app.listen(PORT, () => console.log(`Server on port ${PORT}`))
