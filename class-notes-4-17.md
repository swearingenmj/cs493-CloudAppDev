# CS 493 Cloud Computing

# Dockerfile

```
FROM node
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080
EXPOSE ${PORT}

CMD [ "npm", "start" ]
```

# Docker volumes

A volume is a persistent store of data that is separate from the container’s filesystem. Volumes are useful for storing data that needs to persist beyond the life of a container. Volumes are also useful for sharing data between containers.

``` 
// Make a container!
docker run --rm -it alpine ash  // -it is an interactive shell and --rm will remove the container when it exits

// Make a volume!
docker volume create test-vol
docker run --rm -v test-vol:/test -it alpine ash  // -v is a volume and :/test will mount it in the test directory
cd test
touch foo.txt
exit

// Check the volume!
docker run --rm -v test-vol:/test -it alpine ash
cd test
ls
// foo.txt is there!! <3
```

# Docker compose
- Putting together a lot of different docker images to run at once
    - One image for a webserver, another for the DB, etc.

