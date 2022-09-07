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

mysqliq["insert_adv"] =
  "INSERT INTO advertisement(path,format,product_type,adv_placement,adv_page,created_at) VALUES(?,?,?,?,?,now());";
mysqliq["get_all_adv"] = "SELECT * FROM advertisement";
mysqliq["get_all_adv_old_to_new"] =
  "SELECT * FROM advertisement order by created_at";
mysqliq["get_all_adv_newest"] =
  "SELECT * FROM advertisement order by created_at Desc";
mysqliq["get_all_adv_popular"] =
  "SELECT * FROM advertisement order by clicks Desc";
mysqliq["getsingle_adv"] = "select * from advertisement where id=?";
mysqliq["total_impressions"] =
  "select Sum(clicks) as Total_impression from advertisement";
mysqliq["Top_advertisement"] =
  "SELECT MAX(clicks), product_type FROM advertisement WHERE clicks IN (SELECT MAX(clicks) FROM advertisement)";
mysqliq["advertisement_performance_filter"] =
  "select clicks as number from advertisement where product_type = ?";
