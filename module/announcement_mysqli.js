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

mysqliq["insert_announcement"] =
  "INSERT into announcement (call_to_action,viewer,details,created_at) values(?,?,?,now())";
mysqliq["announcement_info"] = "SELECT * FROM `announcement`  ";
mysqliq["announcement_info_single"] =
  "select  * FROM `announcement` where id= ? ";
