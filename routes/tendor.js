const express = require('express');
const app = express.Router();
const tendor = require('../controller/tendorcontroller');


app.post('/insert_tendor/:user_id', tendor.insert_tendor);
app.post('/insert_bid/:tendor_id/:vendor_id/:bid_end_date/:applied_by',tendor.insert_bid);
app.get('/bid_accept_or_reject/:tendor_id/:vendor_id/:bid_amount/:status',tendor.bid_accept_or_reject);

app.get('/counts',tendor.counts);
app.get('/my_tendors_list/:user_id',tendor.my_tendors_list);
app.get('/my_bids_list/:vendor_id',tendor.my_bids_list);
app.get('/available_tendors',tendor.available_tendors);
app.get('/available_tendors_least_bids',tendor.available_tendors_least_bids);
app.get('/available_tendors_most_bids',tendor.available_tendors_most_bids);

app.get('/view_details_mytendor/:tendor_id',tendor.view_details_mytendor);
app.get('/view_details_mybid/:tendor_id',tendor.view_details_mybid);

module.exports = app