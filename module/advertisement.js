const mysqli = require("./advertisement_mysqli");
const mysqliClass = new mysqli();

class Advertisement {
  constructor() {}
  async addadvertisement(req) {
    let mysql = {};
    let escape_data = [
      req.body.path,
      req.body.format,
      req.body.product_type,
      req.body.adv_placement,
      req.body.adv_page,
    ];
    let strQuery = await mysqliClass.mysqli(mysql, "insert_adv");
    return await global.mysql.query(strQuery, escape_data);
  }

  async get_single_ad(req) {
    let mysql = {};
    let escape_data = [req.params.id];
    let strQuery = await mysqliClass.mysqli(mysql, "getsingle_adv");
    console.log(strQuery);
    await global.mysql.query(
      "UPDATE advertisement set clicks = clicks+1 where id  = ?",
      escape_data
    );
    return await global.mysql.query(strQuery, escape_data);
  }
  async getalladvertisement(req) {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "get_all_adv");

    return await global.mysql.query(strQuery);
  }
  async getalladvertisementinsc(req) {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "get_all_adv_old_to_new");
    return await global.mysql.query(strQuery);
  }
  async getalladvertisementdesc(req) {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "get_all_adv_newest");

    return await global.mysql.query(strQuery);
  }
  async getalladvertisementpopular(req) {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "get_all_adv_popular");

    return await global.mysql.query(strQuery);
  }
  async total_impressions(req) {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "total_impressions");

    return await global.mysql.query(strQuery);
  }
  async Top_advertisement(req) {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "Top_advertisement");

    return await global.mysql.query(strQuery);
  }
  async advertisement_performance_filter(req) {
    let mysql = {};
    let escape_data = [req.params.filter];
    let strQuery = await mysqliClass.mysqli(
      mysql,
      "advertisement_performance_filter"
    );
    return await global.mysql.query(strQuery, escape_data);
  }
}

module.exports = Advertisement;
