# HAAS


## Project Setup
### Prerequisites
* [Install MongoDB](https://docs.mongodb.org/manual/installation/)
* [Install Node.js and NPM](https://nodejs.org/en/download/)
* Get an API key for all of the used APIs (refer to section APIs used for more information) and create your .env file as shown below

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
EXPEDIA_CONSUMER_KEY=YOUR_EXPEDIA_CONSUMER_KEY
AMAZON_AWS_ID=YOUR_AMAZON_AWS_ID
AMAZON_ASSOCIATE_ID=YOUR_AMAZON_ASSOCIATE_ID
AMAZON_ACCESS_KEY_ID=YOUR_AMAZON_ACCESS_KEY_ID
AMAZON_SECRET_ACCESS_KEY=YOUR_AMAZON_SECRET_ACCESS_KEY
FOOD2FORK_API_KEY=YOUR_FOOD2FORK_API_KEY
CONNEXITY_PUBLISHER_ID=YOUR_CONNEXITY_PUBLISHER_ID
CONNEXITY_API_KEY=YOUR_CONNEXITY_API_KEY
```  


## APIs Used
* [Twilio IP Messaging](https://www.twilio.com/ip-messaging)
* [Wolfram Alpha](http://products.wolframalpha.com/api/)
* [Wit.ai](wit.ai)
* [Google Speech Synthesis](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#tts-section)
* [Expedia NLP Hotel Search and Flight Search APIs](http://hackathon.expedia.com/directory)
* [Amazon Product Advertising API](http://docs.aws.amazon.com/AWSECommerceService/latest/DG/Welcome.html)
* [Food2Fork Recipe API](http://food2fork.com/about/api)
* [Connexity Publisher API](https://publisher.connexity.com/)
