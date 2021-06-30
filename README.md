# Solution
## Approach
Solution TLDR:
- Test driven approach
- RabbitMQ for internal communication
- Worker fetches data from [api.artic.edu](https://api.artic.edu/) API
- MongoDB for data storage 
- Mongoose for data validation

The solution has been created mostly test driven, by defining e2e tests as well as integration tests.
In the solution I've set up the two microservices. App MS serves as the external API, which allows external users to
start a worker that fetches data. It also allows users to stop the worker from fetching data.
If a worker is started it fetches artwork data from the [api.artic.edu](https://api.artic.edu/) API every 5 second and then 
sends it back to App MS with RabbitMQ protocol, where the data is stored in local MongoDB database. 

In the solution I have used various design patterns to make the code cleaner and easier maintainable
but I have mostly just followed the standard NesJS convention/design pattern which divides code into controllers and services 
and allows for easy testing with dependency injection. 

## How to run
Install mongodb and rabbitMQ
Start two microservices with ``nest start`` and ``nest start worker``

## Future improvements
More tests should be added to ensure stability of the two microservices. 
The solution could also be containerized to allow for faster startup and avoid having to manually install dependencies (mongodb and rabbitmq)
To make sure the pipeline is stable I would also store references to workers in a database such that in case the server needs to restart
it can start up the active workers again even when memory is cleared. This would also allow users to create multiple workers.


# Welcome to Welds coding-challenge

## Introduction
Here at Weld we use [NestJS](https://nestjs.com/) for our applications. So this project also reflects that. On our front-end we use NextJS and GraphQL. For simplicity we have used the monorepo structure from NestJS.

Fork this repository and create your own repository to get started.

## Challenge
One of our customers wants us to help them build a pipeline for an API (select whichever you want from [Public APIs](https://github.com/public-apis/public-apis)). And they want us to setup a new data-pipeline for them to get information out and into their current data-warehouse.

To accomplish this you will build two services:
- **Data-streams**: Our API that can receive calls and issue commands to **worker**. This service also stores any information that our customer wants to fetch.
- **Worker:** Fetches the data from external API. Makes any transformations you see fit. And sends it back to **data-streams** for storage.

### Steps in challenge
- Configure a message protocol between the two services. You can get inspiration from the [nestjs docs.](https://docs.nestjs.com/microservices/basics) Choose which ever you want but tell us why in your answer.
- Create an endpoint on **data-streams** that tells **worker** to start fetching data on an interval (every 5 minutes).
- Setup an [http module](https://docs.nestjs.com/techniques/http-module) that **worker** can use to communicate with the external API.
- Send the data and store the results on **data-streams** using internal communication protocol.
- Make an endpoint on **data-streams** that can fetch the data stored on **data-streams**. Use whatever storage you see fit but tell us why you chose it.
- Make an endpoint on **data-streams** that can stop the data fetching on **worker**.

## How we evaluate
The test is solely for you to show techniques and design patterns you normally use. Once the techniques and design patterns have been demonstrated then that is enough. No neeed for additional boilerplate. Just include a future work section in your answer and we will include questions in the technical interview.

- We understand that this can be **time consuming**. If you are short on time - then leave something out. But be sure to tell us your approach to the problem in the documentation.
- A documented answer that explains your approach, short-comings, how-to-run and future work.
- A working solution. Preferably with some tests to give us an idea of how you write tests (you don't need to put it all under test).
- Reliability is very important when dealing with data-pipelines. So any measures you can add to keep the data-flowing will be appreciated.
- We appreciate small commits with a trail of messages that shows us how you work.

## Project structure
```
├── README.md
├── apps
│   ├── data-streams
│   └── worker
├── package.json
```
### data-streams:
This is our API. We will be able to issue HTTP requests to this and have it talk to our microservice **worker**.
We also store any information that **worker** sends our way. This project has been setup as a hybrid app. It can both function as an API but also as a microservice with an internal communication layer.

You can start data-streams with:
```
yarn start
```

### worker:
This is the worker microservice that is in charge of talking to the external API. It will fetch data when issued a command from **data-streams** and then return the results. This project only functions as a microservice which means it can only receive commands from the internal communication layer.

You can start worker with:
```
yarn start worker
```
