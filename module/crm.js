const mysqli = require("./crm_mysqli");
const mysqliClass = new mysqli();

class Users {
  constructor() {}

  async customer_table(num) {
    let mysql = {};
    let escape_data;
    escape_data = [num];
    // console.log(escape_data,"escape data")
    let strQuery = await mysqliClass.mysqli(mysql, "customer_table");
    return await global.mysql.query(strQuery, escape_data);
  }

  async view_customer(id) {
    let mysql = {};
    let escape_data;
    escape_data = [id];
    // console.log(escape_data,"escape data")
    let strQuery = await mysqliClass.mysqli(mysql, "view_customer");
    return await global.mysql.query(strQuery, escape_data);
  }

  async view_vendor(id) {
    let mysql = {};
    let escape_data;
    escape_data = [id];
    // console.log(escape_data,"escape data")
    let strQuery = await mysqliClass.mysqli(mysql, "view_vendor");
    return await global.mysql.query(strQuery, escape_data);
  }

  async all_feedback() {
    let mysql = {};
    let escape_data;
    escape_data = [];
    // console.log(escape_data,"escape data")
    let strQuery = await mysqliClass.mysqli(mysql, "all_feedback");
    return await global.mysql.query(strQuery, escape_data);
  }

  async user_feedback(req) {
    let mysql = {};
    let escape_data = [req.params.id];
    let strQuery = await mysqliClass.mysqli(mysql, "user_feedback");

    return await global.mysql.query(strQuery, escape_data);
  }
  async user_rating_all() {
    let mysql = {};
    let escape_data;
    escape_data = [];
    // console.log(escape_data,"escape data")
    let strQuery = await mysqliClass.mysqli(mysql, "user_rating_all");
    return await global.mysql.query(strQuery, escape_data);
  }
  async user_rating_single(req) {
    let mysql = {};
    let escape_data = [req.params.id];
    let strQuery = await mysqliClass.mysqli(mysql, "user_rating_single");

    return await global.mysql.query(strQuery, escape_data);
  }

  async vendor_feedback(req) {
    let mysql = {};
    let escape_data = [req.params.id];
    let strQuery = await mysqliClass.mysqli(mysql, "vendor_feedback");

    return await global.mysql.query(strQuery, escape_data);
  }

  async view_remaining(id) {
    let mysql = {};
    let escape_data;
    escape_data = [id];
    // console.log(escape_data,"escape data")
    let strQuery = await mysqliClass.mysqli(mysql, "view_remaining");
    return await global.mysql.query(strQuery, escape_data);
  }
}

module.exports = Users;

// const object = {'a': 1, 'b': 2, 'c' : 3};

// for (const [key, value] of Object.entries(object)) {
//   console.log(key, value);
// }
