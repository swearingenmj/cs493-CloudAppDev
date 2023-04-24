# Project 1

## Introduction

The goals of this assignment are to practice designing a RESTful API from an application description, to begin implementing endpoints for the API you designed, and to containerize your API using Docker. The assignment has a few different parts, which are outlined below.

## Dockerfile

People can use Dockerfile to build their own images. Dockerfile is a text file that contains all the commands a user could call on the command line to assemble an image. Using docker build users can create an automated build that executes several command-line instructions in succession.

Clean up exited containers and images
```
docker container ls --all
docker container prune // will remove all exited containers

docker image ls --all
docker image rm <image id> // will remove specific image
```

Then Run the following command to build the image
```
docker run -p 12345:8000 my-image

```

## Docker Compose

Docker Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration.
```
docker-compose up
```
Then take everything down with the following command:
```
docker-compose down
```