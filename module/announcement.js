const mysqli = require("./announcement_mysqli");
const mysqliClass = new mysqli();

class Announcement {
  constructor() {}

  async insert_announcement(req) {
    let mysql = {};
    let escape_data = [
      req.body.call_to_action,
      req.body.viewer,
      req.body.details,
    ];
    let strQuery = await mysqliClass.mysqli(mysql, "insert_announcement");
    return await global.mysql.query(strQuery, escape_data);
  }

  async announcement_info() {
    let mysql = {};
    let escape_data;
    escape_data = [];

    let strQuery = await mysqliClass.mysqli(mysql, "announcement_info");
    return await global.mysql.query(strQuery, escape_data);
  }
  async announcement_info_single(req) {
    let mysql = {};
    let escape_data = [req.params.id];
    let strQuery = await mysqliClass.mysqli(mysql, "announcement_info_single");

    return await global.mysql.query(strQuery, escape_data);
  }
}

module.exports = Announcement;
