const express = require('express');
const app = express.Router();
const product = require('../controller/productController');


// app.post('/insert_product',product.insert_product);
app.post('/maximum_sales',product.maximum_sales);

app.post('/no_of_requests/:user_id',product.no_of_requests)
// app.post('/vendor_product_status_changed/:user_id',product.vendor_product_status_changed)
app.get('/pitched_requests/:user_id',product.pitched_requests)
app.get('/new_requests/:user_id',product.new_requests)
app.get('/saved_requests/:user_id',product.saved_requests)
app.post('/request_service/:user_id', product.request_service)
;


app.post('/add_to_cart/:user_id',product.add_to_cart) 
app.get('/get_cart/:user_id',product.get_cart) 
app.post('/update_cart_item/:user_id',product.update_cart_item) 
app.post('/delete_cart_item/:user_id',product.delete_cart_item) 
app.get('/delete_cart/:user_id',product.delete_cart) 

// app.get('/new_requests/:user_id',api.new_requests)

module.exports = app