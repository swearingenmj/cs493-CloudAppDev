var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// POST /businesses
router.post('/', jsonParser, function(req, res, next) {
  const { name, address, city, state, zip, phone, category, subcategories, website, email } = req.body;

  if (!name || !address || !city || !state || !zip || !phone || !category || !subcategories) {
    res.status(400).json({ error: 'Missing required field' });
  }

  const newBusinessId = businesses.length + 1;
  const newBusiness = {
    id: newBusinessId,
    name,
    address,
    city,
    state,
    zip,
    phone,
    category,
    subcategories,
    website,
    email
  }

  res.status(201).json(newBusiness);
});

// PUT /businesses/:businessId
router.put('/:businessId', jsonParser, function(req, res, next) {
  const id = req.params.businessId;
  const business = req.body;

  if (!business.name || !business.address || !business.city || !business.state || !business.zip || !business.phone || !business.category || !business.subcategories) {
    res.status(400).json({ error: 'Missing required field' });
    return;
  }

  res.status(200).send('Business updated successfully.');
});

// GET /businesses
router.get('/', function(req, res, next) {
  if (req.query.page) {
    if (req.query.page <= businesses.length && req.query.page >= 0) {
      const next_page = parseInt(req.query.page) + 1;
      const prev_page = parseInt(req.query.page) - 1;

      page_data = {
        "page_number": `${req.query.page}`,
        "total_pages": `${businesses.length}`,
        "next_page": `/businesses?page=${next_page}`,
        "prev_page": `/businesses?page=${prev_page}`,
      }
    } else {
      res.status(404).json({ error: 'Page not found' });
      return;
    }
  } 

  res.status(200).json(page_data);
});

// GET /businesses/:businessId
router.get('/:businessId', function(req, res, next) {
  const id = req.params.businessId;
  const business_data = [business_data[id]];

  if (id >= 0 && id <= businesses.length) {
    // get reviews
    const reviews = reviews.filter(review => review.business_id == id);
    for (let i = 0; i < reviews.length; i++) {
      business_data.push(reviews[i]);
    }

    // get photos
    const photos = photos.filter(photo => photo.business_id == id);
    for (let i = 0; i < photos.length; i++) {
      business_data.push(photos[i]);
    }

    res.status(200).json(business_data);
  } else {
    res.status(404).json({ error: 'Business not found' });
  }
});


// DELETE /businesses/:businessId
router.delete('/:businessId', function(req, res, next) {
  const id = req.params.businessId;
  business_data.splice(id, 1);
  res.status(200).send('Business deleted successfully.');
});

module.exports = router;
