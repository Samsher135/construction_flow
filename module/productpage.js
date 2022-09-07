const mysqli = require("./productpage_mysqli");
const mysqliClass = new mysqli();

class Users {
  constructor() {}

  async top_product_month() {
    let mysql = {};
    let escape_data;
    escape_data = [];
    // console.log(escape_data,"escape data")
    let strQuery = await mysqliClass.mysqli(mysql, "top_products");
    return await global.mysql.query(strQuery, escape_data);
  }

  async popular_services() {
    let mysql = {};
    let escape_data;
    escape_data = [];
    // console.log(escape_data,"escape data")
    let strQuery = await mysqliClass.mysqli(mysql, "top_services");
    return await global.mysql.query(strQuery, escape_data);
  }

  async product_sales_month() {
    let mysql = {};
    let escape_data;
    escape_data = [];
    // console.log(escape_data,"escape data")
    let strQuery = await mysqliClass.mysqli(mysql, "product_sales_month");
    return await global.mysql.query(strQuery, escape_data);
  }

  async product_sales_prevmonth() {
    let mysql = {};
    let escape_data;
    escape_data = [];
    // console.log(escape_data,"escape data")
    let strQuery = await mysqliClass.mysqli(mysql, "product_sales_prevmonth");
    return await global.mysql.query(strQuery, escape_data);
  }

  async regional_sales() {
    let mysql = {};
    let escape_data;
    escape_data = [];
    // console.log(escape_data,"escape data")
    let strQuery = await mysqliClass.mysqli(mysql, "regional");
    return await global.mysql.query(strQuery, escape_data);
  }

  async piechart() {
    let mysql = {};
    let escape_data;
    escape_data = [];
    // console.log(escape_data,"escape data")
    let strQuery = await mysqliClass.mysqli(mysql, "piechart");
    return await global.mysql.query(strQuery, escape_data);
  }

  async product_performance_high(pro) {
    console.log("module");
    let mysql = {};
    let escape_data = [pro];
    let strQuery = await mysqliClass.mysqli(mysql, "product_performance_high");
    return await global.mysql.query(strQuery, escape_data);
  }
}

module.exports = Users;

// const object = {'a': 1, 'b': 2, 'c' : 3};

// for (const [key, value] of Object.entries(object)) {
//   console.log(key, value);
// }
