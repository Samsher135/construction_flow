const { jsonResponse } = require("./commonController");
const Dashboardmodule = require("../module/Dashboard");
const dashboard = new Dashboardmodule();

module.exports = {
  user_vendor_count: async (req, res) => {
    try {
      let [results] = await Promise.all([
        dashboard.get_user_and_vendor_count(req),
      ]);
      jsonResponse(res, "inserted_product", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  total_vendor: async (req, res) => {
    try {
      let [results] = await Promise.all([dashboard.total_vendor(req)]);
      jsonResponse(res, "Total Vendors", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  total_user: async (req, res) => {
    try {
      let [results] = await Promise.all([dashboard.total_user(req)]);
      jsonResponse(res, "Total Users", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  recent_users: async (req, res) => {
    try {
      let [results] = await Promise.all([dashboard.get_latest_user(req)]);
      jsonResponse(res, "inserted_product", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  recent_vendors: async (req, res) => {
    try {
      let [results] = await Promise.all([dashboard.get_latest_vendor(req)]);
      jsonResponse(res, "inserted_product", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  sales_today: async (req, res) => {
    try {
      let [results] = await Promise.all([dashboard.sales_today(req)]);
      jsonResponse(res, "inserted_product", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  sales_yesterday: async (req, res) => {
    try {
      let [results] = await Promise.all([dashboard.sales_yesterday(req)]);
      jsonResponse(res, "inserted_product", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  recent_orders_newest: async (req, res) => {
    try {
      let [results] = await Promise.all([dashboard.recent_orders(req)]);
      jsonResponse(res, "inserted_product", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  recent_orders_filter: async (req, res) => {
    try {
      let [results] = await Promise.all([dashboard.recent_order_filter(req)]);
      jsonResponse(res, "inserted_product", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  performance_this_month: async (req, res) => {
    try {
      let completedata = [];
      let type = req.params.type;

      // let [results] = await Promise.all([dashboard.performance_thismonth(type)]);
      for (let i = 1; i <= 31; i++) {
        let [results] = await Promise.all([
          dashboard.performance_thismonth(i, type),
        ]);
        if (results[0] === undefined) {
          completedata.push(0);
        } else {
          completedata.push(results[0].performance);
        }
      }
      jsonResponse(res, "inserted_product", completedata);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  performance_previous_month: async (req, res) => {
    try {
      let type = req.params.type;

      let [results] = await Promise.all([
        dashboard.performace_previousmonth(type),
      ]);
      jsonResponse(res, "inserted_product", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  sales_by_state: async (req, res) => {
    try {
      let [results] = await Promise.all([dashboard.sales_by_state(req)]);
      jsonResponse(res, "inserted_product", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  available_filter: async (req, res) => {
    try {
      let [results] = await Promise.all([dashboard.available_filters()]);
      jsonResponse(res, "inserted_product", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  pendingreq: async (req, res) => {
    try {
      let [results] = await Promise.all([dashboard.pending_req()]);
      jsonResponse(res, "inserted_product", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  approve_reject_v_services: async (req, res) => {
    try {
      req.body.status =
        typeof req.params.approve_status === "undefined"
          ? 0
          : req.params.approve_status;
      req.body.id = typeof req.params.id === "undefined" ? 0 : req.params.id;
      let [results] = await Promise.all([
        dashboard.approve_reject_v_services(req),
      ]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      jsonResponse(res, "error", error);
    }
  },

  admin_pitched: async (req, res) => {
    try {
      req.body.id =
        typeof req.params.user_id === "undefined" ? 0 : req.params.user_id;

      let [results] = await Promise.all([dashboard.admin_pitched(req)]);

      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error, "admin_pitched");
      jsonResponse(res, "error", error);
    }
  },

  no_of_pitch: async (req, res) => {
    try {
      let [results] = await Promise.all([dashboard.no_of_pitch()]);
      jsonResponse(res, "success", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
};
