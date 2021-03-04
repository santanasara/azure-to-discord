require('dotenv').config();

const express = require("express")
const axios = require("axios");
var cors = require('cors')

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


app.post('/azure', function (req, res) {
    res.send('POST request to azure');
    const message = {
      username: "Azure Webhook",
      avatar_url: "https://azurementor.files.wordpress.com/2017/10/azure-logo.jpg",
      content:
      `
[${req.body.resource.fields["System.WorkItemType"]} #${req.body.resource.id}](${req.body.resource.fields["System.CreatedBy"].url}) by ${req.body.resource.fields["System.CreatedBy"].displayName}

${req.body.resource.fields["System.Title"]}
${req.body.resource.fields["System.TeamProject"]}
      
State: ${req.body.resource.fields["System.State"]}
Reason: ${req.body.resource.fields["System.Reason"] || " "}
      
      
      
      
      
      `,
    }
    sendToDiscord(message);
  });


  
app.listen(PORT, () => console.log(`Server on port ${PORT}`))
