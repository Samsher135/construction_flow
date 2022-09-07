const {
    jsonResponse
} = require("./commonController");
const vendorModule = require('../module/vendor');
const vendor = new vendorModule();
const productModule = require('../module/product');
const product = new productModule();


module.exports = {

    //app.post('/add_service/:user_id',vendor.add_service)

    add_service: async (req, res) => {
        try {
        
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;          
            let [services] = await Promise.all([vendor.get_services_by_type(req)])
            const set2 = new Set();
            const new_data = req.body.info;
            let count = 0;
            if(services[0]?.info)
            {
                let info_arr = JSON.parse(services[0]?.info)
                const keys = Object.keys(req.body.info[0])
                let new_arr =[]
                let exist = false;
                new_data.map((new_val)=>
                {
                    exist = false;
                    info_arr.map((db_val) =>
                    {
                        count = 0;
                        keys.map((key) => 
                        {
                            if(db_val[key] === new_val[key])
                            {
                                count++;
                            }
                        })
                        if(count === keys.length)
                        {
                            exist = true;
                        }                  
                    })  
                    if(!exist)
                    {
                        new_arr.push(new_val)
                    }                
                })
                info_arr.map((db_val) => new_arr.push(db_val))
                let [results] = await Promise.all([vendor.update_service1(req,new_arr)])
                jsonResponse(res, "success",results)
            }
            else
            {
                let [results] = await Promise.all([vendor.add_service(req,req.body.info)])
                jsonResponse(res, "success",results)
            }
                        
        
        } catch (error) {
            console.log(error,'add_service');
            jsonResponse(res, "error", error);
        };
    },



    //app.post('/delete_service/:user_id',vendor.delete_service)

    delete_service: async (req, res) => {
        try {
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let exists=await Promise.all([vendor.service_exist(req)]);
            
            let index = req.body.info
            let arr = JSON.parse(exists[0][0]?.info)
            let ans = arr.filter((item,ind) => ind !== index)
            
            if(ans.length === 0 )
            {
                let results=await Promise.all([vendor.delete_service(req)]);
                jsonResponse(res, "success",results);
            }
            else
            {
                let results=await Promise.all([vendor.update_service1(req,ans)]);
                jsonResponse(res, "success",results);
            }
            
            
        } catch (error) {
            console.log(error,'delete_service');
            jsonResponse(res, "error", error);
        };
    },


    // app.get('/get_services/:user_id',vendor.get_services)

    get_services: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([vendor.get_services(req)])
            for(var i=0;i<results.length;i++){
                
                if(results[i].info) results[i].info=JSON.parse(results[i].info)
                
                
            }
            jsonResponse(res, "sucess",results)
        } catch (error) {
            console.log(error,'get_services');
            jsonResponse(res, "error", error);
        };
    },


    // app.get('/get_services_by_filter/:user_id',vendor.get_services_by_filter)

    get_services_by_filter: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([vendor.get_services_by_filter(req)])
            for(var i=0;i<results.length;i++){
                
                if(results[i].materials) results[i].materials=JSON.parse(results[i].materials)
                if(results[i].agents) results[i].agents=JSON.parse(results[i].agents)
                if(results[i].vehicles) results[i].vehicles=JSON.parse(results[i].vehicles)
                if(results[i].machines) results[i].machines=JSON.parse(results[i].machines)
                if(results[i].chemicals) results[i].chemicals=JSON.parse(results[i].chemicals)
            }
            jsonResponse(res, "sucess",results)
        } catch (error) {
            console.log(error,'get_services_by_filter');
            jsonResponse(res, "error", error);
        };
    },


    // app.get('/new_leads/:user_id',vendor.new_leads)

    new_leads: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [products] = await Promise.all([vendor.products(req)])
            let [vendors]= await Promise.all([product.vendor()])
        
            if(products.length > 0){
              
                let results;
                
                [results] = await Promise.all([vendor.new_leads(req,products,vendors)])
                
    
                jsonResponse(res, "sucess",results)
            }
            else jsonResponse(res, "Please add some services you provide in services section to see new requests")
            
        } catch (error) {
            console.log(error,'new_leads');
            jsonResponse(res, "error", error);
        };
    },


    // app.get('/get_pending_leads/:user_id',vendor.get_pending_leads)

    get_pending_leads: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;

            if(req.body.type){
                var arr=[]
                for(var i=0; i<req.body.type.length; i++){
                    
                    let [results] = await Promise.all([vendor.get_pending_leads_by_type(req,req.body.type[i])])
                    arr.push(results)
                }
                jsonResponse(res, "sucess",arr)
            }
            else{
                let [results] = await Promise.all([vendor.get_pending_leads(req)])
                jsonResponse(res, "sucess",results)
            }



            
        } catch (error) {
            console.log(error,'get_pending_leads');
            jsonResponse(res, "error", error);
        };
    },


    // app.get('/get_saved_leads/:user_id',vendor.get_saved_leads)

    get_saved_leads: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([vendor.get_saved_leads(req)])
            jsonResponse(res, "sucess",results)
        } catch (error) {
            console.log(error,'get_saved_leads');
            jsonResponse(res, "error", error);
        };
    },


    // app.get('/products/:user_id',vendor.products)

    products: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([vendor.products(req)])
     
            let arr=[]
            for (let i = 0; i <results.length; i++){
                arr.push(results[i].type)
            }
            jsonResponse(res, "sucess",arr)
        } catch (error) {
            console.log(error,'products');
            jsonResponse(res, "error", error);
        };
    },


    // app.get('/total_services/:user_id',vendor.total_services)

    total_services: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([vendor.total_services(req)])
            
            jsonResponse(res, "sucess",results)
        } catch (error) {
            console.log(error,'total_services');
            jsonResponse(res, "error", error);
        };
    },


    // app.get('/maximum_sales_vendor/:user_id',vendor.maximum_sales_vendor)

    maximum_sales_vendor: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([vendor.maximum_sales_vendor(req)])
            
            jsonResponse(res, "sucess",results)
        } catch (error) {
            console.log(error,'maximum_sales_vendor');
            jsonResponse(res, "error", error);
        };
    },

    
    // app.get('/most_requested_service/:user_id',vendor.most_requested_service)

    most_requested_service: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results] = await Promise.all([vendor.most_requested_service(req)])
            
            jsonResponse(res, "sucess",results)
        } catch (error) {
            console.log(error,'most_requested_service');
            jsonResponse(res, "error", error);
        };
    },


    // app.get('/sales_vendor/:user_id',vendor.sales_vendor)

    sales_vendor: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            
            let [result] = await Promise.all([vendor.sales_vendor(req)])
          
                        
            let month_sale={acceptedPitch:"",rejectedPitch:"",pitched:""}
            for(var i=0;i<result?.length;i++){
                if(result[i].product_status==="acceptedPitch"){
                    month_sale.acceptedPitch=result[i]?.count;
                }
                else if(result[i].product_status==="rejectedPitch"){
                    month_sale.rejectedPitch=result[i]?.count;
                }
                else {
                    month_sale.pitched=result[i]?.count;
                }
            }
            
            jsonResponse(res, "sucess",month_sale)
        } catch (error) {
            console.log(error,'sales_vendor');
            jsonResponse(res, "error", error);
        };
    },



    // app.post('/vendor_contribution/:user_id',vendor.vendor_contribution)

    vendor_contribution: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
    
            let [results1]=await Promise.all([vendor.no_of_total_sales(req)])
            let [results] = await Promise.all([vendor.vendor_contribution(req)])
            
            let percentage=((results[0].count)*100)/results1[0].count
            jsonResponse(res, "sucess",`${percentage}%`)
        } catch (error) {
            console.log(error,'vendor_contribution');
            jsonResponse(res, "error", error);
        };
    },



    // app.post('/vendor_pitched/:user_id',vendor.vendor_pitched)

    vendor_pitched: async (req, res) => {
        try {
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            
            

            let [results] = await Promise.all([vendor.vendor_pitched(req)])
            
            jsonResponse(res, "sucess",results)
        } catch (error) {
            console.log(error,'vendor_pitched');
            jsonResponse(res, "error", error);
        };
    },



    // app.post('/vendor_rejected/:user_id',vendor.vendor_rejected)


    vendor_rejected: async (req, res) => {
        try {
            
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            
            let [results] = await Promise.all([vendor.vendor_rejected(req)])
            
            
            jsonResponse(res, "sucess",results)
        } catch (error) {
            console.log(error,'vendor_rejected');
            jsonResponse(res, "error", error);
        };
    },



    // app.post('/vendor_month_sale/:user_id',vendor.vendor_month_sale)

    vendor_month_sale :async(req,res)=>{
        try{
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [result]= await Promise.all([vendor.vendor_month_sale(req)])
            
            let month_sale={acceptedPitch:"",rejectedPitch:"",pitched:""}
            for(var i=0;i<result?.length;i++){
                if(result[i].product_status==="acceptedPitch"){
                    month_sale.acceptedPitch=result[i]?.count;
                }
                else if(result[i].product_status==="rejectedPitch"){
                    month_sale.rejectedPitch=result[i]?.count;
                }
                else {
                    month_sale.pitched=result[i]?.count;
                }
            }
           
            jsonResponse(res, "sucess",month_sale)

        }
        catch(error){
            console.log(error,'vendor_month_sale');
            jsonResponse(res, "error", error);
        }
    },



    // app.get('/vendor_sale_percentage/:user_id',vendor.vendor_sale_percentage)

    vendor_sale_percentage :async(req,res)=>{
        try{
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let percentage=await Promise.all([vendor.vendor_month_percentage(req)])
            jsonResponse(res, "sucess",percentage)

        }
        catch(error){
            console.log(error,'vendor_sale_percentage');
            jsonResponse(res, "error", error);
        }
    },


    // app.get('/most_sold_product/:user_id',vendor.most_sold_product)

    most_sold_product :async(req,res)=>{
        try{
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results]=await Promise.all([vendor.most_sold_product(req)])
            jsonResponse(res, "sucess",{results})

        }
        catch(error){
            console.log(error,'most_sold_product');
            jsonResponse(res, "error", error);
        }
    },


    // app.post('/get_price_detail/:user_id',vendor.get_price_detail)

    get_price_detail:async(req,res)=>{
        try{
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [results]=await Promise.all([vendor.get_price_detail(req)])
            jsonResponse(res, "sucess",results)
        }
        catch(error){
            console.log(error,'get_price_detail');
            jsonResponse(res, "error", error);
        }
    },


    // app.get('/no_of_pending_requests_by_type/:user_id',vendor.no_of_pending_requests_by_type)

    no_of_pending_requests_by_type: async (req, res) => {
        try {
     
            req.body.id = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
            let [products] = await Promise.all([vendor.products(req)])
            let [results] = await Promise.all([vendor.no_of_pending_requests_by_type(req,products)])
            let map_of_=[];
            for(let i=0; i<results.length; i++){

                map_of_[results[i]?.type]=(map_of_[results[i]?.type] || 0) + 1;
            }

        
            
            jsonResponse(res, "sucess",{results,map_of_}); 
            
            
            
        } catch (error) {
            console.log(error,'no_of_pending_requests_by_type');
            jsonResponse(res, "error", error);
        };
    },
    
}