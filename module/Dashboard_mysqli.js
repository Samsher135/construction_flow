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
mysqliq["total_vendor_and_users"] =
  "SELECT CASE when isUser=0 then 'vendor' else 'user' end as Who, count(*) as count from users group by isUser";

mysqliq["total_vendor"] =
  "SELECT COUNT(*) as TotalVendor from users  where isUser=0";

mysqliq["total_user"] =
  "SELECT COUNT(*) as TotalUser from users  where isUser=1";

mysqliq["latest_users"] =
  "SELECT count(*) as user from users where datediff(now(),created_at)<=31 && isUser = 1";

mysqliq["latest_vendor"] =
  "SELECT count(*) as vendor from users where datediff(now(),created_at)<=31 && isUser = 0";

mysqliq["sales_today"] =
  "select count(*) as sales_today from product where status='accepted'&& datediff(now(),updated_at)=0";

mysqliq["sales_yesterday"] =
  "select count(*) as sales_yesterday from product where status='accepted'&& datediff(now(),updated_at)=1";

// mysqliq["recent_orders"] ="select type,quantity,users.email,(SELECT users.first_name where product.user_id=users.id)as 'Requested_by',(SELECT users.first_name where vendorproduct.Uid = users.id) as 'Vendor',CASE WHEN ( vendorproduct.product_status='rejectedPitch') THEN 'Rejected' WHEN ( vendorproduct.product_status='acceptedPitch') THEN  'Accepted' WHEN (vendorproduct.product_status='pitched') THEN 'Pitched' ELSE 'in Process' END as statusofProduct, vendorproduct.Uid = users.id as vendor,product.user_id = users.id as requested_by,CASE WHEN ( vendorproduct.product_status='rejectedPitch') THEN  vendorproduct.pitch_value WHEN (vendorproduct.product_status='acceptedPitch') THEN vendorproduct.pitch_value WHEN (vendorproduct.product_status='pitched') THEN vendorproduct.pitch_value ELSE '-' END as AMOUNT from product join vendorproduct on product.id = vendorproduct.Pid left join users on product.user_id = users.id ORDER by product.created_at DESC LIMIT 0,5";
mysqliq["recent_orders"] =
  "SELECT DISTINCT(product.id),product.type as 'product',product.quantity,CASE WHEN (vendorproduct.product_status='rejectedPitch') THEN 'Rejected' WHEN (vendorproduct.product_status='acceptedPitch') THEN  'Accepted' WHEN (vendorproduct.product_status='pitched') THEN 'in Process' END as status,(SELECT users.first_name FROM users WHERE users.id = product.user_id) AS 'Requested_by' ,(SELECT users.first_name FROM users WHERE users.id = product.accepted_vendor) AS 'vendor',vendorproduct.pitch_value as 'amount' FROM product INNER JOIN vendorproduct ON vendorproduct.Pid = product.id ORDER by product.status DESC";

// mysqliq["pending_orders"]="SELECT product.type as 'product',product.quantity,vendorproduct.product_status as 'status', (SELECT users.first_name FROM users WHERE users.id = product.user_id) AS 'Requested_by' ,(SELECT users.first_name FROM users WHERE users.id = vendorproduct.Uid) AS 'vendor',product.final_total_value as 'amount',vendorproduct.pitch_value FROM product INNER JOIN vendorproduct ON vendorproduct.Pid = product.id INNER JOIN vendor_services ON vendor_services.vendor_id != vendorproduct.Uid WHERE product.type = vendor_services.type ORDER by product.created_at DESC"
mysqliq["pending_orders"] =
  "SELECT DISTINCT(product.id),product.type as 'product',product.quantity,product.status,(SELECT users.first_name FROM users WHERE users.id = product.user_id) AS 'Requested_by' ,(SELECT users.first_name FROM users WHERE users.id = product.accepted_vendor) AS 'vendor',product.final_pitchValue as 'amount' FROM product INNER JOIN vendorproduct ON vendorproduct.Pid <> product.id WHERE product.status = 'pending' ORDER by product.created_at DESC";
// mysqliq["recent_order_filter"] ="select type,quantity,users.email,(SELECT users.first_name where product.user_id=users.id)as 'Requested_by',(SELECT users.first_name where vendorproduct.Uid = users.id) as 'Vendor',CASE WHEN ( vendorproduct.product_status='rejectedPitch') THEN 'Rejected' WHEN ( vendorproduct.product_status='acceptedPitch') THEN  'Accepted' WHEN (vendorproduct.product_status='pitched') THEN 'Pitched' ELSE 'in Process' END as statusofProduct, vendorproduct.Uid = users.id as vendor,product.user_id = users.id as requested_by,CASE WHEN ( vendorproduct.product_status='rejectedPitch') THEN  vendorproduct.pitch_value WHEN (vendorproduct.product_status='acceptedPitch') THEN vendorproduct.pitch_value WHEN (vendorproduct.product_status='pitched') THEN vendorproduct.pitch_value ELSE '-' END as AMOUNT from product join vendorproduct on product.id = vendorproduct.Pid left join users on product.user_id = users.id ORDER by product.status=? DESC LIMIT 0,5";
mysqliq["recent_order_filter"] =
  "SELECT DISTINCT(product.id),product.type as 'product',product.quantity,CASE WHEN (vendorproduct.product_status='rejectedPitch') THEN 'Rejected' WHEN (vendorproduct.product_status='acceptedPitch') THEN  'Accepted' WHEN (vendorproduct.product_status='pitched') THEN 'in Process' END as status,(SELECT users.first_name FROM users WHERE users.id = product.user_id) AS 'Requested_by' ,(SELECT users.first_name FROM users WHERE users.id = product.accepted_vendor) AS 'vendor',vendorproduct.pitch_value as 'amount' FROM product INNER JOIN vendorproduct ON vendorproduct.Pid = product.id ORDER by product.status=? DESC";
// mysqliq["recent_order_filter"]="SELECT product.type as 'product',product.quantity,CASE WHEN (vendorproduct.product_status='rejectedPitch' || vendproduct.product_status='rejected') THEN 'Rejected' WHEN(vendorproduct.product_status='acceptedPitch')THEN 'Accepted' WHEN (vendorproduct.product_status='pitched') THEN 'Pitched' as status, (SELECT users.first_name FROM users WHERE users.id = product.user_id) AS 'Requested_by' ,(SELECT users.first_name FROM users WHERE users.id = vendorproduct.Uid) AS 'vendor',product.final_total_value as 'amount',vendorproduct.pitch_value FROM product INNER JOIN vendorproduct ON vendorproduct.Pid = product.id INNER JOIN vendor_services ON vendor_services.vendor_id != vendorproduct.Uid WHERE product.type = vendor_services.type ORDER BY  vendorproduct.product_status=? DESC LIMIT 0,5"

mysqliq["performance_thismonth"] =
  "SELECT type , count(*) as performance from product where (status='accepted' && datediff(now(),updated_at)<=? && type=?) group by type";

mysqliq["performace_previousmonth"] =
  "SELECT type , count(*) as performance from product where (status='accepted' && datediff(now(),updated_at)<=61 && datediff(now(),updated_at)>31 && type=?) group by type";

mysqliq["sales_by_state"] =
  "SELECT json_extract(product.delivery_address, '$.state') As state,COUNT(status) FROM product WHERE status = 'accepted' GROUP BY json_extract(product.delivery_address, '$.state') ORDER BY COUNT(status) DESC";

mysqliq["available_filters"] = "SELECT distinct type from product";

mysqliq["pending_services"] =
  "SELECT users.first_name,vendor_services.* FROM `vendor_services` INNER JOIN users ON users.id = vendor_services.vendor_id WHERE approve_status = 'pending'";
mysqliq["approve_reject_v_services"] =
  "UPDATE `vendor_services` SET `approve_status`= ? WHERE id = ?";

mysqliq["admin_pitched"] =
  "INSERT into vendorproduct(Pid,Uid,pitch_value,price_detail,product_status) VALUES(?,?,?,?,?)";
mysqliq["get_user_id"] = "SELECT user_id from product where id=?";

mysqliq["no_of_pitch"] =
  "SELECT (SELECT users.first_name FROM users WHERE product.user_id =  users.id) AS 'name', COUNT(vendorproduct.id) as 'pitch_count' FROM vendorproduct INNER JOIN product ON product.id =vendorproduct.Pid WHERE vendorproduct.product_status = 'pitched'";

// "select type,
// quantity,
//   users.email,
//   CASE
//   WHEN (product.status ='pending'&& vendorproduct.product_status='rejectedPitch') THEN  'Rejected'
//    WHEN (product.status ='pending' && vendorproduct.product_status='acceptedPitch') THEN  'Accepted'
//    WHEN (product.status ='pending' && vendorproduct.product_status='pitched') THEN 'Pitched'
//    ELSE 'in Process'
//   END as statusofProduct,
//    product.accepted_vendor = users.id as requested_by,
//   CASE
//   WHEN (product.status ='pending'&& vendorproduct.product_status='rejectedPitch') THEN  vendorproduct.pitch_value
//    WHEN (product.status ='pending' && vendorproduct.product_status='acceptedPitch') THEN vendorproduct.pitch_value
//    WHEN (product.status ='pending' && vendorproduct.product_status='pitched') THEN vendorproduct.pitch_value
//    ELSE '-'
//    END as AMOUNT
//   from product
//   join vendorproduct on product.id = vendorproduct.Pid
//   left join users on product.user_id = users.id
//   ORDER by product.created_at DESC"
