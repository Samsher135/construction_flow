module.exports = class mysqli {
    async mysqli(data, row) {
      let k = mysqliq[row];
      for (var i in data) {
        k = k.replace(new RegExp("{{" + i + "}}", "g"), data[i]);
      }
      return k;
    }
  
    async sfqli(data, row) {
      let k = mysqliq[row];
      for (var i in data) {
        k = k.replace(new RegExp("{{" + i + "}}", "g"), data[i]);
      }
      return k;
    }
  };
  
  let mysqliq = [];
  
  mysqliq["addblog"] =
    "INSERT INTO blog(path,title,text ,category,created_at) VALUES(?,?,?,?,now())"
    mysqliq["get_all_blog"] = "SELECT * FROM blog";
    mysqliq["getsingle_blog"] = "select * from blog where id=?";
    mysqliq["total_impressions_blog"] =
  "select Sum(clicks) as Total_impression from blog";
 