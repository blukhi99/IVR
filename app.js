var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var accountSid = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Your Account SID from www.twilio.com/console
var authToken = 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
// var client = new twilio(accountSid, authToken);
const VoiceResponse = twilio.twiml.VoiceResponse;

app.get('/', (req, res) => {
  res.send('Hello World!');

  
  // client.messages.create({
  //   body: 'Hello from Node',
  //   to: '+919687388313',  // Text this number
  //   from: '+12406164584' // From a valid Twilio number
  // }).then((message) => console.log(message.sid));

  // client.calls.create({
  //   url: 'http://demo.twilio.com/docs/voice.xml',
  //   to: '+919687388313',  // Text this number
  //   from: '+12406164584', // From a valid Twilio number
  // }).then(call => console.log(call.sid));
  
});

app.post('/incoming', (req, res) => {
  const voiceResponse = new VoiceResponse();

  const gather = voiceResponse.gather({
    action: '/find-consulatnt',
    // numDigits: '6', //this means action will execute after 6 digits
    method: 'POST',
  });
  
  gather.say(
    `Please, Type Consulatnt Id and pressed #`,    
    {loop: 3}
  );

  res.send(voiceResponse.toString())
});

app.post('/find-consulatnt', (req, res) => {
  const consultantId = req.body.Digits;
  const phoneNumber = "+919687388313"// find ConsultantNumber from Database
  
  console.log("ConsultantId", consultantId)

  const voiceResponse = new VoiceResponse();
  voiceResponse.dial(phoneNumber, 
    {
      timeLimit : 10
    });

  res.send(voiceResponse.toString()) 
});

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log('Example app listening on port 3000!');
});