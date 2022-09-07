const {
    jsonResponse
} = require("./commonController");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const notificationModule = require('../module/notification');
const notification= new notificationModule();
let noti=[]


const usersModule = require('../module/orders');
const orders = new usersModule();
const mysqli = require('../module/orders_mysqli');
const { json } = require("body-parser");
const mysqliClass = new mysqli();

module.exports = {

    orders_details:async(req,res)=>{
        try {
            let filter=req.params.filter
            let [results] = await Promise.all([orders.order_detail(filter)])
            
            jsonResponse(res, "sucess", results) 
            
        } catch (error) {

            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    orders_graph_user :async (req,res)=> {
        try {
        filter_type = (typeof (req.params.filter) === 'undefined') ? 0 : req.params.filter;
        if (filter_type=="year"){
            let mysql={};
            var myVariable = new Date();
            var makeDate = new Date(myVariable);
            let nv1= makeDate.toISOString();
            let end_date= nv1.slice(0,10);
            makeDate.setFullYear(makeDate.getFullYear() - 1);
            let nv= makeDate.toISOString();
            let start_date= nv.slice(0,10);
            let escape_data=[start_date,end_date];
            let strQuery1=await mysqliClass.mysqli(mysql, 'orders_user')
            let [result] = await global.mysql.query(strQuery1, escape_data);
            var myvar1 = new Date();
            var makeD = new Date(myvar1);
            makeD.setFullYear(makeD.getFullYear() - 2);
            let nc1= makeD.toISOString();
            let end_date1= nc1.slice(0,10);
            var makeD1 = new Date(myvar1);
            makeD1.setFullYear(makeD1.getFullYear() - 1);
            let nc= makeD1.toISOString();
            let start_date1= nc.slice(0,10);
            let escape_data1=[end_date1,start_date1];
            let strQuery2=await mysqliClass.mysqli(mysql, 'orders_user')
            let [result1] = await global.mysql.query(strQuery2, escape_data1);
            var A = result['COUNT(DISTINCT(user_id))'];
            var B = result1['COUNT(DISTINCT(user_id))'];
            console.log(A,B)
            var percDiff =  100 * Math.abs( (A - B) / ( (A+B)/2 ) );
            console.log(percDiff);
            // var neww = result[0].push({"percent":percDiff});
            result.perc = {
                "percent" : percDiff
            };
            jsonResponse(res, "sucess", result);


        }else if(filter_type=="month") {
            let mysql={};
            var myVariable = new Date();
            var makeDate = new Date(myVariable);
            let nv1= makeDate.toISOString();
            let end_date= nv1.slice(0,10);
            makeDate.setMonth(makeDate.getMonth() - 1);
            let nv= makeDate.toISOString();
            let start_date= nv.slice(0,10);
            let escape_data=[start_date,end_date];
            let strQuery1 = await mysqliClass.mysqli(mysql, 'orders_user')
            let [result]= await global.mysql.query(strQuery1, escape_data);
            var myvar1 = new Date();
            var makeD = new Date(myvar1);
            makeD.setMonth(makeD.getMonth() - 2);
            let nc1= makeD.toISOString();
            let end_date1= nc1.slice(0,10);
            var makeD1 = new Date(myvar1);
            makeD1.setMonth(makeD1.getMonth() - 1);
            let nc= makeD1.toISOString();
            let start_date1= nc.slice(0,10);
            let escape_data1=[end_date1,start_date1];
            let strQuery2=await mysqliClass.mysqli(mysql, 'orders_user')
            let [result1] = await global.mysql.query(strQuery2, escape_data1);
            var A = result['COUNT(DISTINCT(user_id))'];
            var B = result1['COUNT(DISTINCT(user_id))'];
            console.log(A,B)
            var percDiff =  100 * Math.abs( (A - B) / ( (A+B)/2 ) );
            console.log(percDiff);
            // var neww = result[0].push({"percent":percDiff});
            result.perc = {
                "percent" : percDiff
            };
            jsonResponse(res, "sucess", result);
        }else{
            let mysql={};
            var myVariable = new Date();
            var makeDate = new Date(myVariable);
            let nv1= makeDate.toISOString();
            let end_date= nv1.slice(0,10);
            makeDate.setDate(makeDate.getDate() - 7);
            let nv= makeDate.toISOString();
            let start_date= nv.slice(0,10);
            let escape_data=[start_date,end_date];
            let strQuery1 = await mysqliClass.mysqli(mysql, 'orders_user')
            let [result]= await global.mysql.query(strQuery1, escape_data);
            console.log(result);
            console.log(result['COUNT(DISTINCT(user_id))']);
            var myvar1 = new Date();
            var makeD = new Date(myvar1);
            makeD.setDate(makeD.getDate() - 14);
            let nc1= makeD.toISOString();
            let end_date1= nc1.slice(0,10);
            var makeD1 = new Date(myvar1);
            makeD1.setDate(makeD1.getDate() - 7);
            let nc= makeD1.toISOString();
            let start_date1= nc.slice(0,10);
            let escape_data1=[end_date1,start_date1];
            let strQuery2=await mysqliClass.mysqli(mysql, 'orders_user')
            let [result1] = await global.mysql.query(strQuery2, escape_data1);
            console.log(result1);
            var A = result['COUNT(DISTINCT(user_id))'];
            var B = result1['COUNT(DISTINCT(user_id))'];
            console.log(A,B)
            var percDiff =  100 * Math.abs( (A - B) / ( (A+B)/2 ) );
            console.log(percDiff);
            // var neww = result[0].push({"percent":percDiff});
            result.perc = {
                "percent" : percDiff
            };
            jsonResponse(res, "sucess", result);
        }
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },
    orders_graph_vendor :async (req,res)=> {
        try {
            filter_type = (typeof (req.params.filter) === 'undefined') ? 0 : req.params.filter;
            if (filter_type=="year"){
                let mysql={};
                var myVariable = new Date();
                var makeDate = new Date(myVariable);
                let nv1= makeDate.toISOString();
                let end_date= nv1.slice(0,10);
                makeDate.setFullYear(makeDate.getFullYear() - 1);
                let nv= makeDate.toISOString();
                let start_date= nv.slice(0,10);
                console.log(end_date,start_date)
                let escape_data=[start_date,end_date];
                let strQuery1=await mysqliClass.mysqli(mysql, 'orders_vendor')
                let [result] = await global.mysql.query(strQuery1, escape_data);
                var myvar1 = new Date();
                var makeD = new Date(myvar1);
                makeD.setFullYear(makeD.getFullYear() - 2);
                let nc1= makeD.toISOString();
                let end_date1= nc1.slice(0,10);
                var makeD1 = new Date(myvar1);
                makeD1.setFullYear(makeD1.getFullYear() - 1);
                let nc= makeD1.toISOString();
                let start_date1= nc.slice(0,10);
                let escape_data1=[end_date1,start_date1];
                let strQuery2=await mysqliClass.mysqli(mysql, 'orders_vendor')
                let [result1] = await global.mysql.query(strQuery2, escape_data1);
                            var A = result['COUNT(DISTINCT(accepted_vendor))'];
                var B = result1['COUNT(DISTINCT(accepted_vendor))'];
                console.log(A,B)
                var percDiff =  100 * Math.abs( (A - B) / ( (A+B)/2 ) );
                console.log(percDiff);
                // var neww = result[0].push({"percent":percDiff});
                result.perc = {
                    "percent" : percDiff
                };
                jsonResponse(res, "sucess", result);
    
    
            }else if(filter_type=="month") {
                let mysql={};
                var myVariable = new Date();
                var makeDate = new Date(myVariable);
                let nv1= makeDate.toISOString();
                let end_date= nv1.slice(0,10);
                makeDate.setMonth(makeDate.getMonth() - 1);
                let nv= makeDate.toISOString();
                let start_date= nv.slice(0,10);
                let escape_data=[start_date,end_date];
                let strQuery1 = await mysqliClass.mysqli(mysql, 'orders_vendor')
                let [result]= await global.mysql.query(strQuery1, escape_data);
                var myvar1 = new Date();
                var makeD = new Date(myvar1);
                makeD.setMonth(makeD.getMonth() - 2);
                let nc1= makeD.toISOString();
                let end_date1= nc1.slice(0,10);
                var makeD1 = new Date(myvar1);
                makeD1.setMonth(makeD1.getMonth() - 1);
                let nc= makeD1.toISOString();
                let start_date1= nc.slice(0,10);
                let escape_data1=[end_date1,start_date1];
                let strQuery2=await mysqliClass.mysqli(mysql, 'orders_vendor')
                let [result1] = await global.mysql.query(strQuery2, escape_data1);
                            var A = result['COUNT(DISTINCT(accepted_vendor))'];
                var B = result1['COUNT(DISTINCT(accepted_vendor))'];
                console.log(A,B)
                var percDiff =  100 * Math.abs( (A - B) / ( (A+B)/2 ) );
                console.log(percDiff);
                // var neww = result[0].push({"percent":percDiff});
                result.perc = {
                    "percent" : percDiff
                };
                jsonResponse(res, "sucess", result);
            }else{
                let mysql={};
                var myVariable = new Date();
                var makeDate = new Date(myVariable);
                let nv1= makeDate.toISOString();
                let end_date= nv1.slice(0,10);
                makeDate.setDate(makeDate.getDate() - 7);
                let nv= makeDate.toISOString();
                let start_date= nv.slice(0,10);
                let escape_data=[start_date,end_date];
                let strQuery1 = await mysqliClass.mysqli(mysql, 'orders_vendor')
                let [result]= await global.mysql.query(strQuery1, escape_data);
                var myvar1 = new Date();
                var makeD = new Date(myvar1);
                makeD.setDate(makeD.getDate() - 14);
                let nc1= makeD.toISOString();
                let end_date1= nc1.slice(0,10);
                var makeD1 = new Date(myvar1);
                makeD1.setDate(makeD1.getDate() - 7);
                let nc= makeD1.toISOString();
                let start_date1= nc.slice(0,10);
                let escape_data1=[end_date1,start_date1];
                let strQuery2=await mysqliClass.mysqli(mysql, 'orders_vendor')
                let [result1] = await global.mysql.query(strQuery2, escape_data1);
                var A = result['COUNT(DISTINCT(accepted_vendor))'];
                var B = result1['COUNT(DISTINCT(accepted_vendor))'];
                console.log(A,B)
                var percDiff =  100 * Math.abs( (A - B) / ( (A+B)/2 ) );
                console.log(percDiff);
                // var neww = result[0].push({"percent":percDiff});
                result.perc = {
                    "percent" : percDiff
                };
                jsonResponse(res, "sucess", result);
            }
        } catch (error) {
            console.log(error);
            jsonResponse(res, "error", error);
        }
    },
    order_detail_user:async(req,res)=>{
        try {
            let filter=req.params.filter
            let [results] = await Promise.all([orders.order_detail_user(filter)])
            
            jsonResponse(res, "sucess", results) 
            
        } catch (error) {

            console.log(error);
            jsonResponse(res, "error", error);
        }
    },
}