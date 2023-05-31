# CS 493 Cloud Computing

## Project 4

- Note about MySQL and BLOBs

## POSTing images (or any binary data)

- How the data is encoded
- GET, POST, DELETE
    - Each has "payload". some data that get submitted with the request
    - Need a way to pass binary data in the payload
        - We'll use something other than JSON -- a different encoding

```
POST /images HTTP/1.1
Host: localhost
Content-Type: multipart/form-data;boundary="theBoundary"

--theBoundary
Content-Disposition: form-data; name="userId"

1234
--theBoundary
Content-Disposition: form-data; name="image"; filename="myImage.jpg"

<image_binary_data_goes_here>
--theBoundary--
```

## Reading binary images data in Express with Multer


## Using