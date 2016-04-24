# HAAS


## Project Setup
### Prerequisites
* [Install MongoDB](https://docs.mongodb.org/manual/installation/)
* [Install Node.js and NPM](https://nodejs.org/en/download/)
* Get an API key for all of the used APIs (refer to section APIs used for more information)

### Initialization
Now execute variations of the following terminal commands to setup and run HAAS:  
```
$ git clone https://github.com/kkajla12/haas.git
$ cd haas
$ npm install
$ ./mongod(.exe) => from MongoDB directory in another terminal window
$ touch .env => setup your .env file to contain all your API keys
$ npm start
```  

### .env File Structure
```
USER_SECRET=YOUR_USER_SECRET
TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
TWILIO_IPM_SERVICE_SID=YOUR_TWILIO_IPM_SERVICE_SID
TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
TWILIO_API_KEY=YOUR_TWILIO_API_KEY
TWILIO_API_SECRET=YOUR_TWILIO_API_SECRET
WOLFRAM_ALPHA_APP_ID=YOUR_WOLFRAM_ALPHA_APP_ID
WIT_ACCESS_TOKEN=YOUR_WIT_ACCESS_TOKEN
```  


## APIs Used (Incomplete List)
* [Twilio IP Messaging](https://www.twilio.com/ip-messaging)
* [Wolfram Alpha](http://products.wolframalpha.com/api/)
* [Wit.ai](wit.ai)
* [Google Speech Synthesis](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#tts-section)
