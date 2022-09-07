const mysqli = require("./Dashboard_mysqli");
const mysqliClass = new mysqli();

class Dashboard {
  constructor() {}
  async get_user_and_vendor_count(req) {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "total_vendor_and_users");
    return await global.mysql.query(strQuery);
  }
  async total_vendor(req) {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "total_vendor");
    return await global.mysql.query(strQuery);
  }
  async total_user(req) {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "total_user");
    return await global.mysql.query(strQuery);
  }
  async get_latest_user(req) {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "latest_users");
    return await global.mysql.query(strQuery);
  }
  async get_latest_vendor(req) {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "latest_vendor");
    return await global.mysql.query(strQuery);
  }
  async sales_today(req) {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "sales_today");
    return await global.mysql.query(strQuery);
  }
  async sales_yesterday(req) {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "sales_yesterday");
    return await global.mysql.query(strQuery);
  }
  async recent_orders(req) {
    let mysql = {};
    let escape_data = [];
    let strQuery = await mysqliClass.mysqli(mysql, "recent_orders");
    return await global.mysql.query(strQuery);
  }
  async recent_order_filter(req) {
    let mysql = {};
    let escape_data = [req.params.filter];
    let strQuery = await mysqliClass.mysqli(mysql, "recent_order_filter");
    return await global.mysql.query(strQuery, escape_data);
  }
  async performance_thismonth(number, type) {
    let mysql = {};
    let escape_data = [number, type];
    let strQuery = await mysqliClass.mysqli(mysql, "performance_thismonth");
    return await global.mysql.query(strQuery, escape_data);
  }
  async performace_previousmonth(type) {
    let mysql = {};
    let escape_data = [type];
    let strQuery = await mysqliClass.mysqli(mysql, "performace_previousmonth");
    return await global.mysql.query(strQuery, escape_data);
  }
  async sales_by_state(req) {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "sales_today");
    return await global.mysql.query(strQuery);
  }
  async available_filters() {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "available_filters");
    return await global.mysql.query(strQuery);
  }
  async pending_req() {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "pending_orders");
    return await global.mysql.query(strQuery);
  }

  async approve_reject_v_services(req) {
    let mysql = {};
    let escape_data = [req.body.status, req.body.id];
    let strQuery = await mysqliClass.mysqli(mysql, "approve_reject_v_services");
    return await global.mysql.query(strQuery, escape_data);
  }

  async admin_pitched(req) {
    let mysql = {};
    let escape_data;

    let price_detail = JSON.stringify(req.body.price_detail);
    escape_data = [
      req.body.Pid,
      req.body.id,
      req.body.pitch_value,
      price_detail,
      "pitched",
    ];
    let a = req.body.Pid;
    let b = await mysqliClass.mysqli(mysql, "get_user_id");
    let c = await global.mysql.query(b, a);
    let userid = c[0].user_id;

    await notification.setnotification(
      userid,
      "New Pitch",
      `You have recived a new Pitch of worth" ${req.body.pitch_value}`
    );

    let strQuery = await mysqliClass.mysqli(mysql, "admin_pitched");
    return await global.mysql.query(strQuery, escape_data);
  }

  async no_of_pitch() {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "no_of_pitch");
    return await global.mysql.query(strQuery);
  }
}
module.exports = Dashboard;
