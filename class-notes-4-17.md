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

const express = require('express');
const router = express.Router();


---------------


// GET /businesses
router.get('/', (req, res) => {
    // Return paginated list of businesses
    res.json({
        businesses: [
            {
                name: 'Lord of the Fries',
                address: {
                    street: '111 Play Pl',
                    city: 'San Bernardino',
                    state: 'CA',
                    zip: '92401',
                },
                phone: '909-888-1001',
                categories: [
                    { name: 'Restaurant', subcategories: ['Fast Food'] },           
                ],
            },
            {
                name: 'Vinyl Resting Place',
                address: {
                    street: '8332 N Lombard St',
                    city: 'Portland',
                    state: 'OR',
                    zip: '97203',
                },
                phone: '503-247-9573',
                categories: [
                    { name: 'Shopping', subcategories: ['Record Stores'] },
                ],
            },
        ],
        nextPage: null,
    })
})

// GET /businesses/:id

router.get('/:id', (req, res) => {
    const { id } =  req.params;

    // Return detailed information about a specific business (by id)
    res.json({
        name: 'Lord of the Fries',
        address: {
            street: '111 Play Pl',
            city: 'San Bernardino',
            state: 'CA',
            zip: '92401',
        },
        phone: '909-888-1001',
        categories: [
            { name: 'Restaurant', subcategories: ['Fast Food'] },
        ],
        website: 'https://www.mcdonalds.com/us/en-us.html',
        email: 'info@mcdonalds.com',
    })
})

// POST /businesses
router.post('/', (req, res) => {
    const { name, address, phone, categories, website, email } = req.body;

    // Verify request body
    if (!name || !address || !phone || !categories) {
        res.status(400).json({ err: 'Missing required fields' });
        return;
    }
})




-------------------


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;



// const express = require('express');
// const businesses = require('./businesses');
// const reviews = require('./reviews');
// const photos = require('./photos');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// // Register API endpoints
// app.use('/businesses', businesses);
// app.use('/reviews', reviews);
// app.use('/photos', photos);

// Start the server
// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// })

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })


// Business Endpoints

// POST /businesses: Add a new business
// GET /businesses: Get all businesses
// GET /businesses/:id: Get detailed information about a specific business (by id)
// PUT /businesses/:id: Modify an existing business (by id)
// DELETE /businesses/:id: Delete an existing business (by id)

// Review Endpoints

// POST /businesses/:id/reviews: Add a new review to a business (by id)
// GET /businesses/:id/reviews: Get all reviews for a business (by id)
// PUT /businesses/:id/reviews/:review_id: Modify an existing review (by id)
// DELETE /businesses/:id/reviews/:review_id: Delete an existing review (by id)

// Photo Endpoints

// POST /businesses/:id/photos: Add a new photo to a business (by id)
// GET /businesses/:id/photos: Get all photos for a business (by id)
// PUT /businesses/:id/photos/:photo_id: Modify an existing photo (by id)
// DELETE /businesses/:id/photos/:photo_id: Delete an existing photo (by id)

// User Endpoints

// GET /users/:id/businesses: Get all businesses owned by a user (by id)
// GET /users/:id/reviews: Get all reviews written by a user (by id)
// GET /users/:id/photos: Get all photos uploaded by a user (by id)

// app.get('/data', (req, res) => {
//     res.status(200).json(data);
// })

// app.get('/data/:id', (req, res) => {
//     const id = req.params.id;

//     if (id >= 0 && id < data.length) {
//         res.json(data[id]);
//     } else {
//         res.status(400).json({ 
//             "err": "id out of range" 
//         });
//     }
// })

// app.post('/data', (req, res) => {
//     const new_data = req.body;
//     data.push(new_data);
//     res.status(201).json(data);
// })

// function do_it(req, res) {
//     console.log("do_it");
//     res.send("Hello world!");
// }

// app.get('/foo', do_it);
