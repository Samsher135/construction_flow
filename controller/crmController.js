const { jsonResponse } = require("./commonController");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const notificationModule = require("../module/notification");
const notification = new notificationModule();
let noti = [];

const usersModule = require("../module/crm");
const crm = new usersModule();
const mysqli = require("../module/users_mysqli");
const { json } = require("body-parser");
const mysqliClass = new mysqli();

module.exports = {
  customer_table: async (req, res) => {
    try {
      let num = req.params.n;
      let [results] = await Promise.all([crm.customer_table(num)]);
      // let res1 = JSON.parse(results);

      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  view_customer: async (req, res) => {
    try {
      let [results] = await Promise.all([crm.view_customer(req.params.id)]);
      // let obj = JSON.parse(results[0].data)
      // const joined = Object.values(obj).join(' ');
      // console.log(joined)
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  view_vendor: async (req, res) => {
    try {
      let [results] = await Promise.all([crm.view_vendor(req.params.id)]);
      // let res1 = JSON.parse(results);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  all_feedback: async (req, res) => {
    try {
      let [results] = await Promise.all([crm.all_feedback()]);
      // let res1 = JSON.parse(results);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  user_feedback: async (req, res) => {
    try {
      let [results] = await Promise.all([crm.user_feedback(req)]);
      console.log(results);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  user_rating_all: async (req, res) => {
    try {
      let [results] = await Promise.all([crm.user_rating_all()]);
      // let res1 = JSON.parse(results);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  user_rating_single: async (req, res) => {
    try {
      let [results] = await Promise.all([crm.user_rating_single(req)]);
      console.log(results);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  vendor_feedback: async (req, res) => {
    try {
      let [results] = await Promise.all([crm.vendor_feedback(req)]);
      console.log(results);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  view_remaining: async (req, res) => {
    try {
      let [results] = await Promise.all([crm.view_remaining(req.params.id)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
};
