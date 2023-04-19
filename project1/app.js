const express = require('express');
const app = express();
const port = 3000;

const data = [11, 22, 33, 44];

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/data', (req, res) => {
    res.status(200).json(data);
})

app.get('/data/:id', (req, res) => {
    const id = req.params.id;

    if (id >= 0 && id < data.length) {
        res.json(data[id]);
    } else {
        res.status(400).json({ 
            "err": "id out of range" 
        });
    }
})

app.post('/data', (req, res) => {
    const new_data = req.body;
    data.push(new_data);
    res.status(201).json(data);
})

function do_it(req, res) {
    console.log("do_it");
    res.send("Hello world!");
}

app.get('/foo', do_it);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// var business = [
//     {
//         id: 1,
//         name: "Criminal Coffee",
//         street: "555 Coffee St.",
//         city: "Bend",
//         state: "Oregon",
//         zip: "97701",
//         phone: "555-555-5555",
//         category: "restaurant",
//         subcategory: "coffee",
//         website: null,
//         email: null,
//     },
// ];

// function get_business(req, res) {
//     console.log("get_business: ", business)
//     res.send(business);
// }

// function set_business(req, res) {
//     console.log("set_business: ", req.body)
//     business = req.body;
//     res.send(business);
// }

// function get_business_id(req, res) {
//     console.log("get_business_id: ", req.params.businessID)
//     res.send(business.id);
// }

// app.get('/business', get_business(req, res) {
//     ...
// });

// app.use(express.json());

// app.post('/business', (req, res) {
//     ...
// });

// app.get('/business/:businessID', get_business_id(req, res, next) {
//     ...
// });

// app.put('/business/:businessID', (req, res, next) {
//     ...
// });

// app.delete('/business/:businessID', (req, res, next) {
//     var businessID = parseInt(req.params.businessID);
//     if (business[businessID]) {
//         business[businessID] = null;
//         res.status(204).end();
//     } else {
//         next();
//     }
// });
