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

var mysqliq = [];
//user
mysqliq["productt_sales_year"] =
  "select count(*) from vendorproduct where product_status <> 'rejectedPitch' && product_status <> 'rejectedPitch' && datediff(now(),updated_at)<=365";
mysqliq["product_sales_month"] =
  "select count(*) from vendorproduct where product_status <> 'rejectedPitch' && product_status <> 'rejectedPitch' && datediff(now(),updated_at)<=30";
mysqliq["product_sales_prevmonth"] =
  "select count(*) from vendorproduct where product_status <> 'rejectedPitch' && product_status <> 'rejectedPitch' && datediff(now(),updated_at)<=66 && datediff(now(),updated_at)>=30";
mysqliq["prodcut_sales_week"] =
  "select count(*) from vendorproduct where product_status <> 'rejectedPitch' && product_status <> 'rejectedPitch' && datediff(now(),updated_at)<=7";
mysqliq["product_performance_today"] =
  'SELECT COUNT(service_type=?) as count from product where status="accepted" && datediff(now(),updated_at)<=0 ';
mysqliq["product_performance_month"] =
  'SELECT COUNT(service_type=?) as count from product where status="accepted" && datediff(now(),updated_at)<=30 ';
mysqliq["product_performance_year"] =
  'SELECT COUNT(service_type=?) as count from product where status="accepted" && datediff(now(),updated_at)<=365 ';
mysqliq["top_products"] =
  'SELECT COUNT(*)as count,type  FROM product where status = "accepted" && datediff(now(),updated_at)<=30 GROUP BY type ORDER by COUNT(*) DESC';
mysqliq["top_services"] =
  'SELECT COUNT(*)as count,service_type FROM product where status = "accepted" && datediff(now(),updated_at)<=30 GROUP BY service_type ORDER by COUNT(*) DESC';
mysqliq["product_sales_month"] =
  "SELECT COUNT(*) as count from product WHERE status = 'accepted' && datediff(now(),updated_at)<=30";
mysqliq["product_sales_prevmonth"] =
  "select count(*) as count from product where status = 'accepted' && datediff(now(),updated_at)<=60 && datediff(now(),updated_at)>=30";
mysqliq["regional"] = "SELECT delivery_address FROM product";
// mysqliq["piechart"] = 'SELECT COUNT(CASE WHEN product.status = "accepted" THEN 1 ELSE NULL END) AS Completed, COUNT(CASE WHEN product.status = "pending" THEN 1 ELSE NULL END) AS pending, COUNT(CASE WHEN product.status = ":rejected" THEN 1 ELSE NULL END) AS rejected,COUNT(DISTINCT(vendorproduct.product_status)) AS Inprogress FROM product,vendorproduct WHERE vendorproduct.product_status = "pitched"'
mysqliq["piechart"] =
  "SELECT COUNT(status) AS 'accepted', (SELECT COUNT(product.status) FROM product WHERE product.status = 'pending') as 'pending', (SELECT COUNT(product.status) FROM product WHERE product.status = 'rejected') as 'rejected' , (SELECT COUNT(vendorproduct.product_status) FROM vendorproduct WHERE vendorproduct.product_status = 'pitched') as 'Inprogress' FROM product WHERE status = 'accepted'";
mysqliq["product_performance_high"] =
  ' SELECT MAX(type ) from product where status="accepted" ';
