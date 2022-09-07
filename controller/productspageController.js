const { jsonResponse } = require("./commonController");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const notificationModule = require("../module/notification");
const notification = new notificationModule();
let noti = [];

const usersModule = require("../module/productpage");
const products = new usersModule();
const mysqli = require("../module/users_mysqli");
const { json } = require("body-parser");
const mysqliClass = new mysqli();

module.exports = {
  top_product_month: async (req, res) => {
    try {
      let [results] = await Promise.all([products.top_product_month(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  popular_services: async (req, res) => {
    try {
      let [results] = await Promise.all([products.popular_services(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  product_sales_perc: async (req, res) => {
    try {
      let [[results]] = await Promise.all([products.product_sales_month(req)]);

      let [[results1]] = await Promise.all([
        products.product_sales_prevmonth(req),
      ]);

      var A = results["count"];
      var B = results1["count"];

      var percDiff = 100 * Math.abs((A - B) / ((A + B) / 2));
      jsonResponse(res, "sucess", percDiff);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  regional_sales: async (req, res) => {
    try {
      let [results] = await Promise.all([products.regional_sales()]);
      // let res1 = JSON.parse(results);
      console.log(results);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  piechart: async (req, res) => {
    try {
      let [results] = await Promise.all([products.piechart()]);
      // let res1 = JSON.parse(results);
      console.log(results);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  product_performance_high: async (req, res) => {
    try {
      let [results] = await Promise.all([products.product_performance_high()]);

      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error, "product_performance_high");
      jsonResponse(res, "error", error);
    }
  },
};
