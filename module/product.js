// const mysqli = require('./mysqli');
const mysqli = require('./product_mysqli');
const mysqliClass = new mysqli();
const notificationModule = require('./notification');
const notification= new notificationModule();


class Product {
    constructor() {}

    async insert_product(req) {
        let mysql = {};
        let escape_data = [req.body.name, req.body.type];
        let strQuery = await mysqliClass.mysqli(mysql, 'insert_product');
        return await global.mysql.query(strQuery, escape_data);
    }
    async maximum_sales(req) {
        let mysql = {};
        let status='accepted'
        let escape_data = [status];
        let strQuery = await mysqliClass.mysqli(mysql, 'maximum_sales');
        return await global.mysql.query(strQuery, escape_data);
    }
    async no_of_requests(req) {
        let mysql = {};
        let escape_data = [req.body.id,req.body.status];
        let strQuery = await mysqliClass.mysqli(mysql, 'no_of_requests');
        return await global.mysql.query(strQuery, escape_data);
    }

    async pitched_requests(id) {
        let mysql = {};
        let escape_data = [id,"pitched","acceptedPitch","rejectedPitch"];
        let strQuery = await mysqliClass.mysqli(mysql, 'pitched_requests');

        return await global.mysql.query(strQuery, escape_data);
    }

    async new_requests(req,vendor) {
        let mysql = {};
        let escape_data;
        let strQuery;
      
            escape_data = [req,"pending"];
            

        if(vendor?.length > 0){
            strQuery = await mysqliClass.mysqli(mysql, 'new_requests');
        }
        else{
            strQuery = await mysqliClass.mysqli(mysql, 'new_requests1');
        }
        

        return await global.mysql.query(strQuery, escape_data);
        
        
        
    }
    async new_requests1(req) {
        let mysql = {};
        
        let escape_data = [req,"pending"];
   
        let strQuery = await mysqliClass.mysqli(mysql, 'new_requests1');
        
        return await global.mysql.query(strQuery, escape_data);
    }
    
    async saved_requests(req) {
        let mysql = {};
        
        let escape_data = [req,"acceptedPitch","rejectedPitch"];
        let strQuery = await mysqliClass.mysqli(mysql, 'saved_requests');

        return await global.mysql.query(strQuery, escape_data);
    }
    async request_service(req,delivery_address) {
        let mysql = {};
        
       
        let escape_data = [req.body.id,req.body.service_type,req.body.type,req.body.typecapacity,req.body.quantity,"pending",req.body.urgent,req.body.deliver_by,delivery_address,JSON.stringify(req.body.data),req.body.trade];
    
        
        let a= req.body.type;
        let b=await mysqliClass.mysqli(mysql, 'vendor_id');
        let c= await  global.mysql.query(b, a);
        
        c.map(async (id)=>{
            await notification.setnotification(id.vendor_id,"New Request",`A new request is been made ${a}`)
            
        })
        let strQuery = await mysqliClass.mysqli(mysql, 'request_service');
        return await global.mysql.query(strQuery, escape_data);
    } 
    async vendor() {
        let mysql = {};
        
        let escape_data = [];
        // console.log(escape_data)
        let strQuery = await mysqliClass.mysqli(mysql, 'vendor');
        // console.log(strQuery);
        return await global.mysql.query(strQuery, escape_data);
    }

    async add_to_cart(req) {
        let mysql = {};
        let escape_data = [req.body.id,req.body.service_type,req.body.type,req.body.typecapacity,req.body.quantity,JSON.stringify(req.body.data),JSON.stringify(req.body.delivery_address)];
        let strQuery = await mysqliClass.mysqli(mysql, 'add_to_cart');
        return await global.mysql.query(strQuery, escape_data);
    }
    async get_cart(req) {
        let mysql = {};
        let escape_data = [req.body.id];
        let strQuery = await mysqliClass.mysqli(mysql, 'get_cart');
        return await global.mysql.query(strQuery, escape_data);
    }
    async update_cart_item(req) {
        let mysql = {};
        let escape_data = [req.body.service_type,req.body.type,req.body.typecapacity,req.body.quantity,JSON.stringify(req.body.details),req.body.item_id];
        let strQuery = await mysqliClass.mysqli(mysql, 'update_cart_item');
        return await global.mysql.query(strQuery, escape_data);
    }
    async delete_cart_item(req) {
        let mysql = {};
        let escape_data = [req.body.item_id];
        let strQuery = await mysqliClass.mysqli(mysql, 'delete_cart_item');
        return await global.mysql.query(strQuery, escape_data);
    }
    async delete_cart(req) {
        let mysql = {};
        let escape_data = [req.body.id];
        let strQuery = await mysqliClass.mysqli(mysql, 'delete_cart');
        return await global.mysql.query(strQuery, escape_data);
    }
    async product_performance (pro){
        console.log('module')
        let mysql={}
        let escape_data=[pro]
        let strQuery = await mysqliClass.mysqli(mysql, 'product_performance');
        return await global.mysql.query(strQuery, escape_data);
    }
    
}

module.exports = Product;