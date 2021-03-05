require('dotenv').config();

const express = require("express")
var cors = require('cors')
const axios = require("axios");

const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

const sendToDiscord = async (message, route) => {
  try{
    await axios.post(route, message)
  }catch(e){
    console.log(e)
  }
}

const processBody = (req, res, route) => {
  res.send('POST request to azure');
  var content = '';

  switch(req.route.path){
    case '/pull-request-updated':
    case '/pull-request-created':
      content = `[Pull request #${req.body.resource.pullRequestId}](${req.body.resource.url})\r\n\ ${req.body.detailedMessage.markdown}* Area: ${req.body.resource.repository.name}`;
      break;
    default:
      content = req.body.detailedMessage.markdown;
  }
  const message = {
    username: "Azure Webhook",
    avatar_url: "https://azurementor.files.wordpress.com/2017/10/azure-logo.jpg",
    content: `${content} \r\n\r\n-`,
  }
  sendToDiscord(message, route);
}

app.post('/work-item-created', (req, res) => processBody(req, res, process.env.AZURE_BOARD));
app.post('/work-item-updated', (req, res) => processBody(req, res, process.env.AZURE_BOARD));
app.post('/pull-request-created', (req, res) => processBody(req, res, process.env.AZURE_PR));
app.post('/pull-request-updated', (req, res) => processBody(req, res, process.env.AZURE_PR));
app.post('/code-pushed', (req, res) => processBody(req, res, process.env.AZURE_CODE));

 
app.listen(PORT, () => console.log(`Server on port ${PORT}`))
