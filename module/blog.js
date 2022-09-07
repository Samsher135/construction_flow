const mysqli = require("./blog_mysqli");
const mysqliClass = new mysqli();

class Blog {
  constructor() {}
  async addblog(req) {
    let mysql = {};
    let escape_data = [
      req.body.path,
      req.body.title,
      req.body.text,
      req.body.category
      
    ];
    let strQuery = await mysqliClass.mysqli(mysql, "addblog");
    return await global.mysql.query(strQuery, escape_data);
  }
  async getallblog(req) {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "get_all_blog");

    return await global.mysql.query(strQuery);
  }
  async get_single_blog(req) {
    let mysql = {};
    let escape_data = [req.params.id];
    let strQuery = await mysqliClass.mysqli(mysql, "getsingle_blog");
    console.log(strQuery);
    await global.mysql.query(
      "UPDATE blog set clicks = clicks+1 where id  = ?",
      escape_data
    );
    return await global.mysql.query(strQuery, escape_data);
  }
  async total_impressions_blog(req) {
    let mysql = {};
    let strQuery = await mysqliClass.mysqli(mysql, "total_impressions_blog");

    return await global.mysql.query(strQuery);
  }

}

module.exports = Blog;
