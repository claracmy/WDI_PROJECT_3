# WDI_GROUP_PROJECT - WATSON'S JOKES

## Stack and tools
- MongoDB
- Express.js
- AngularJS
- Node.js
- Bower, Yarn
- Gulp
- Filestack API, IBM Watson API, Facebook API, AWS S3 Bucket  

## Introduction
The original idea of the app was to utilise the IBM Watson API to convert text materials to speech. However, upon realising the characters limit imposed, we decided to pivot into a jokes app. The users are able to upload text files or text input and receive an embedded audio version of it on the platform. Users are able to comment, like or unlike jokes. Users can log in via Facebook or share the app on Facebook.

## Tech
The core of the app is the translation of text into speech. The process begins when the user sends text via a POST request to the server. The server then makes an API call to IBM Watson, receiving an Audio buffer back, which is then intercepted and uploaded onto our AWS Bucket (also setting the format to wav). The audio URL on AWS can now be retrived and embedded on our front-end. There were async issues requiring custom promises and the Watson API was slightly difficult to work with (wav header needs to be repaired using its built in algorithm).

Below is a diagram describing the process.
![Diagram](https://imgur.com/0O4w0gv.png)
And when filestack is supported.
![Diagram2](https://imgur.com/hlM7nlI.png)

## Timeline 
Day 1 : Authentication and tests
Day 2 : Wireframing, RESTful routes
Day 3 : Uploading text to Filestack and sending it to Watson
Day 4 : Getting a response from Watson from back-end to front-end, RESTful views
Day 5 : Intercepting file response and uploading it to AWS, OAuth, RESTful views
Day 6 : Creating seeds, comments, likes
Day 7 : Styling, error message display, Facebook sharing

## Challenges

#### Technical challenges
- Getting a response from Watson and using FileStack to upload files
- Dealing with audio files types and complex API interactions
- Getting an audio wav file when creating seeds
- Time constraints
- Character limit on Watson API

#### Management challenges
- Agreeing on an idea
- Lack of clear purpose of app leading to pivot halfway through
- Lack of coordination of tasks
- GitHub conflicts sometimes causing code to be edited incorrectly

Homepage
![Homepage](https://imgur.com/NzDcssS.png)
Show page
![Showpage](https://imgur.com/42FVtds.png)
Profile page
![profile](https://imgur.com/T6qv5MS.png)

## Recommendations for future work
- Spend more time on planning and design, with a clear definition of MVP
- Implement Angular filters for search
- Adding sentient to Watson voice
- Test Driven Development

## Contributors Github
[Harry Robertson](https://github.com/harryr89)
[Masee Hussain](https://github.com/Ma5ee2)
[Ismail Alami](https://github.com/ialami)
![Group](https://imgur.com/swO3G2w.png)
![Group2](https://imgur.com/OxbOAF7.png)
