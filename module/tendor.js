// const mysqli = require('./mysqli');
const mysqli = require('./tendor_mysqli');
const mysqliClass = new mysqli();
const notificationModule = require('./notification');
const notification= new notificationModule();


class Product {
    constructor() {}

    async insert_tendor(req) {
        let mysql = {};
        let escape_data = [req.body.area, req.body.requirements, req.body.ground_type, req.body.no_of_floors, req.body.no_of_rooms, req.body.no_of_kitchens, req.body.no_of_bathrooms, req.body.budget, req.body.bid_end_date, req.body.work_description, 'pending', req.body.applied_by];

        let a;
        let b= await mysqliClass.mysqli(mysql, 'vendor_id');
        let c= await  global.mysql.query(b, a);
        console.log(c);
        c.map(async (id)=>{
            await notification.setnotification(id.id,"New tendor",`A new tendor request is been found`)
        })
        let strQuery = await mysqliClass.mysqli(mysql, 'insert_tendor');
        return await global.mysql.query(strQuery, escape_data);
    }

    async insert_bid(req) {
        let mysql = {};

        let x = req.body.Vid;
        let y= await mysqliClass.mysqli(mysql, 'get_company_name');
        let z= await  global.mysql.query(y, x);
        let company_name = z[0].company_name;

        let a = req.body.Tid;

        let escape_data = [req.body.Tid, req.body.Vid, req.body.bid_end_date, 'Bidded', req.body.per_sq_ft_charges, req.body.elevation_charges, req.body.extra_charges, req.body.grand_total,company_name];
        let strQuery = await mysqliClass.mysqli(mysql, 'insert_bid');
        return await global.mysql.query(strQuery, escape_data);
        
    }

    async bid_accept_or_reject(req) {
        let mysql = {};

        let escape_data  = [req.body.tendorstatus,req.body.Vid,req.body.amount,req.body.Tid];
        let escape_data2  = [req.body.bidstatus,req.body.Tid,req.body.Vid];


        let b= await mysqliClass.mysqli(mysql, 'update_status_vendorid_bidamount');
        let c= await  global.mysql.query(b, escape_data);

        let x= await mysqliClass.mysqli(mysql, 'update_bidstatus');
        return await  global.mysql.query(x, escape_data2);
        
    }

    async counts(req) {
        let mysql = {};
        let escape_data = [];
        let strQuery = await mysqliClass.mysqli(mysql, "counts");
        return await global.mysql.query(strQuery, escape_data);
      }

    async my_tendors_list(req) {
        let mysql = {};
        let escape_data = [req.body.applied_by];
        let strQuery = await mysqliClass.mysqli(mysql, "my_tendors_list");
        return await global.mysql.query(strQuery, escape_data);
    }

    async my_bids_list(req) {
        let mysql = {};
        let escape_data = [req.body.Vid];
        let strQuery = await mysqliClass.mysqli(mysql, "my_bids_list");
        return await global.mysql.query(strQuery, escape_data);
    }

    async available_tendors(req) {
        let mysql = {};
        let escape_data = [];
        let strQuery = await mysqliClass.mysqli(mysql, "available_tendors");
        return await global.mysql.query(strQuery, escape_data);
    }


    async available_tendors_least_bids(req) {
        let mysql = {};
        let escape_data = [];
        let strQuery = await mysqliClass.mysqli(mysql, "available_tendors_least_bids");
        return await global.mysql.query(strQuery, escape_data);
    }

    async available_tendors_most_bids(req) {
        let mysql = {};
        let escape_data = [];
        let strQuery = await mysqliClass.mysqli(mysql, "available_tendors_most_bids");
        return await global.mysql.query(strQuery, escape_data);
    }

    async view_details_mytendor(req) {
        let mysql = {};
        let escape_data = [req.body.Tid];
        let strQuery = await mysqliClass.mysqli(mysql, "view_details_mytendor");
        return await global.mysql.query(strQuery, escape_data);
    }

    async view_details_mybid(req) {
        let mysql = {};
        let escape_data = [req.body.Tid];
        let strQuery = await mysqliClass.mysqli(mysql, "view_details_mybid");
        return await global.mysql.query(strQuery, escape_data);
    }
    
}

module.exports = Product;