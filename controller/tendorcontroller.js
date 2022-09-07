const {
    jsonResponse
} = require("./commonController");
const tendorModule = require('../module/tendor');
const notificationModule = require('../module/notification');
const tendor = new tendorModule();
const notification= new notificationModule();
let noti=[]


module.exports = {

    insert_tendor: async (req, res) => {
        try {
            
            req.body.applied_by = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;
     
            let [results] = await Promise.all([tendor.insert_tendor(req)]);
            jsonResponse(res, "tendor inserted in tendor table", results)
        
        } catch (error) {
            jsonResponse(res, "error", error);
        };
    },

    insert_bid: async (req, res) => {
        try {
            
            req.body.Tid = (typeof (req.params.tendor_id) === 'undefined') ? 0 : req.params.tendor_id;
            req.body.Vid = (typeof (req.params.vendor_id) === 'undefined') ? 0 : req.params.vendor_id;
            req.body.bid_end_date = (typeof (req.params.bid_end_date) === 'undefined') ? 0 : req.params.bid_end_date;

            let [results] = await Promise.all([tendor.insert_bid(req)]);
            await notification.setnotification(req.params.applied_by,"New bid",`A new bid is placed`)
            jsonResponse(res, "Bid placed succefully")
        
        } catch (error) {
            jsonResponse(res, "error", error);
        };
    },

    bid_accept_or_reject: async (req, res) => {
        try {
            req.body.Tid = (typeof (req.params.tendor_id) === 'undefined') ? 0 : req.params.tendor_id;
            req.body.Vid = (typeof (req.params.vendor_id) === 'undefined') ? 0 : req.params.vendor_id;
            req.body.amount = (typeof (req.params.bid_amount) === 'undefined') ? 0 : req.params.bid_amount;
        
            if (req.params.status == "accept"){
                req.body.bidstatus = 'acceptedbid';
                req.body.tendorstatus = 'accepted';
                console.log("accepted");
                let [results] = await Promise.all([tendor.bid_accept_or_reject(req)]);
                jsonResponse(res, "Bid accepted")
                await notification.setnotification(req.body.Vid,"bid accepted",`A new bid is accepted`)
            }else{
                req.body.bidstatus = 'rejectedbid';
                req.body.tendorstatus = 'pending';
                let [results] = await Promise.all([tendor.bid_accept_or_reject(req)]);
                jsonResponse(res, "Bid rejected")
                await notification.setnotification(req.body.Vid,"bid rejected",`A new bid is rejected`)
            }
        
        
        } catch (error) {
            jsonResponse(res, "error", error);
        };
    },
    
    counts:async(req,res)=>{
        try {
            let [results] = await Promise.all([tendor.counts(req)])
            jsonResponse(res, "sucess", results)
            
        } catch (error) {

            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    my_tendors_list:async(req,res)=>{
        try {
            req.body.applied_by = (typeof (req.params.user_id) === 'undefined') ? 0 : req.params.user_id;

            let [results] = await Promise.all([tendor.my_tendors_list(req)])
            jsonResponse(res, "sucess", results)
            
        } catch (error) {

            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    my_bids_list:async(req,res)=>{
        try {
            req.body.Vid = (typeof (req.params.vendor_id) === 'undefined') ? 0 : req.params.vendor_id;

            let [results] = await Promise.all([tendor.my_bids_list(req)])
            jsonResponse(res, "sucess", results)
            
        } catch (error) {

            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    available_tendors:async(req,res)=>{
        try {
            let [results] = await Promise.all([tendor.available_tendors(req)])
            jsonResponse(res, "sucess", results)
            
        } catch (error) {

            console.log(error);
            jsonResponse(res, "error", error);
        }
    },


    available_tendors_least_bids:async(req,res)=>{
        try {
            let [results] = await Promise.all([tendor.available_tendors_least_bids(req)])
            jsonResponse(res, "sucess", results)
            
        } catch (error) {

            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    available_tendors_most_bids:async(req,res)=>{
        try {
            let [results] = await Promise.all([tendor.available_tendors_most_bids(req)])
            jsonResponse(res, "sucess", results)
            
        } catch (error) {

            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    view_details_mytendor:async(req,res)=>{
        try {
            req.body.Tid = (typeof (req.params.tendor_id) === 'undefined') ? 0 : req.params.tendor_id;
            let [results] = await Promise.all([tendor.view_details_mytendor(req)])
            jsonResponse(res, "sucess", results)
            
        } catch (error) {

            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

    view_details_mybid:async(req,res)=>{
        try {
            req.body.Tid = (typeof (req.params.tendor_id) === 'undefined') ? 0 : req.params.tendor_id;
            let [results] = await Promise.all([tendor.view_details_mybid(req)])
            jsonResponse(res, "sucess", results)
            
        } catch (error) {

            console.log(error);
            jsonResponse(res, "error", error);
        }
    },

}