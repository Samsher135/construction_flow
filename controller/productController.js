const {
    jsonResponse
} = require("./commonController");
const productModule = require('../module/product');
const notificationModule = require('../module/notification');
const product = new productModule();
const notification= new notificationModule();
let noti=[]


module.exports = {

    insert_product: async (req, res) => {
        try {
  
            let [results] = await Promise.all([product.insert_product(req)])
            jsonResponse(res, "product inserted", results)
        
        } catch (error) {
            console.log(error,'insert_product');
            jsonResponse(res, "error", error);
        };
    },


    //app.post('/maximum_sales',product.maximum_sales);

    maximum_sales: async (req, res) => {
        try {

            let [results] = await Promise.all([product.maximum_sales(req)])

            jsonResponse(res, "sucess", results)
        } catch (error) {
            console.log(error,'maximum_sales');
            jsonResponse(res, "error", error);
        };
    },


    //app.post('/no_of_requests/:user_id',product.no_of_requests)

    no_of_requests: async (req, res) => {
        try {
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            
            let [results] = await Promise.all([product.no_of_requests(req)])
            jsonResponse(res, "sucess", results)

        } catch (error) {
            console.log(error,'no_of_requests');
            jsonResponse(res, "error", error);
        };
    },


    //app.get('/pitched_requests/:user_id',product.pitched_requests)
    
    pitched_requests: async (req, res) => {
        try {
            

            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let arr1=[];
            let arr=[];
            let [results1] = await Promise.all([product.pitched_requests(req.body.id)])
            jsonResponse(res, "sucess", results1)
            
        } catch (error) {
            console.log(error,'pitched_requests');
            jsonResponse(res, "error", error);
        };
    },

    //app.get('/new_requests/:user_id',product.new_requests)

    new_requests: async (req, res) => {
        try {
            

            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            
           
            let [vendor]= await Promise.all([product.vendor()])
          
            
            let results;
        
                [results] = await Promise.all([product.new_requests(req.body.id,vendor)]);
            
            
            
                jsonResponse(res, "sucess",results)
            
        } catch (error) {
            console.log(error,"new_requests");
            jsonResponse(res, "error", error);
        };
    },


    //app.get('/saved_requests/:user_id',product.saved_requests)

    saved_requests: async (req, res) => {
        try {
    

            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;

            let [results1] = await Promise.all([product.saved_requests(req.body.id)])
         
            jsonResponse(res, "sucess", results1)
            
        } catch (error) {
            console.log(error,"saved_requests");
            jsonResponse(res, "error", error);
        };
    },


    //app.post('/request_service/:user_id', product.request_service)

    request_service: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
     
            var delivery_address = JSON.stringify(req.body.delivery_address);
            console.log(delivery_address)
            let [results] = await Promise.all([product.request_service(req,delivery_address)]);
            jsonResponse(res, "request inserted in product table", results)
        
        } catch (error) {
            console.log(error,'request_service');
            jsonResponse(res, "error", error);
        };
    },  


    // app.post('/add_to_cart/:user_id',product.add_to_cart) 

    add_to_cart: async (req, res) => {
        try {

            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([product.add_to_cart(req)]);
            jsonResponse(res, "request inserted in product table", results)
        
        } catch (error) {
            console.log(error,'add_to_cart');
            jsonResponse(res, "error", error);
        };
    },


    //app.get('/get_cart/:user_id',product.get_cart) 

    get_cart: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([product.get_cart(req)]);
            jsonResponse(res, "request inserted in product table", results)
        
        } catch (error) {

            console.log(error,'get_cart');
            jsonResponse(res, "error", error);
        };
    },  


    //app.post('/update_cart_item/:user_id',product.update_cart_item) 

    update_cart_item: async (req, res) => {
        try {

            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([product.update_cart_item(req)]);
            jsonResponse(res, "request inserted in product table", results)
        
        } catch (error) {
            console.log(error,'update_cart_item');
            jsonResponse(res, "error", error);
        };
    },  


    //app.post('/delete_cart_item/:user_id',product.delete_cart_item) 

    delete_cart_item: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([product.delete_cart_item(req)]);
            jsonResponse(res, "request inserted in product table", results)
        
        } catch (error) {
            console.log(error,'delete_cart_item');
            jsonResponse(res, "error", error);
        };
    },  

    //app.get('/delete_cart/:user_id',product.delete_cart)

    delete_cart: async (req, res) => {
        try { 
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([product.delete_cart(req)]);
            jsonResponse(res, "request inserted in product table", results)
        
        } catch (error) {
            console.log(error,'delete_cart');
            jsonResponse(res, "error", error);
        };
    },
    

}