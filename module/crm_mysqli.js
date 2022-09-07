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

// mysqliq['customer_table'] = 'SELECT first_name as "customer name" , company_name as "company name", address as "Location" , count(product.user_id) as "Requests" , count(case when product.status = "accepted" then 1 else null end) as "Completed Requests" from users join product on users.id = product.user_id where users.isUser =? GROUP by product.user_id '
mysqliq["customer_table"] =
  "SELECT id,first_name as 'customer_name' , company_name as 'company_name', address as 'Location' ,(SELECT COUNT(product.user_id) FROM product WHERE product.user_id = users.id) as 'requests', (SELECT COUNT(product.status) FROM product WHERE product.status = 'accepted' && product.user_id = users.id) as 'completed_req' FROM users where users.isUser = ?";
mysqliq["view_customer"] =
  "SELECT users.first_name,users.company_name,users.email,users.phone_no,users.whatsapp_no,users.city,product.id,product.service_type,product.type,product.data,product.quantity,product.placed_on,product.deliver_by,product.urgent,product.delivery_address,vendorproduct.vendor_name,vendorproduct.pitch_value,vendorproduct.product_status,vendorproduct.updated_at,DATEDIFF(product.placed_on, product.deliver_by) as overdue FROM product INNER JOIN users ON users.id = product.user_id INNER JOIN vendorproduct ON vendorproduct.Pid = product.id WHERE users.id = ?";
mysqliq["view_vendor"] =
  "SELECT users.first_name,users.company_name,users.email,users.phone_no,users.whatsapp_no,users.city,product.id,product.type,product.data,product.quantity,product.placed_on,product.deliver_by,product.urgent,product.delivery_address,(SELECT users.first_name FROM users WHERE users.id =product.user_id) as customer_name,vendorproduct.pitch_value,vendorproduct.product_status,vendorproduct.updated_at,DATEDIFF(product.placed_on, product.deliver_by) as overdue FROM product INNER JOIN users ON users.id = product.accepted_vendor LEFT JOIN vendorproduct ON vendorproduct.Uid = users.id WHERE users.id = ?";
mysqliq["all_feedback"] =
  'SELECT first_name,company_name, feedback,created_at FROM users WHERE feedback !=""';

mysqliq["user_feedback"] =
  "SELECT first_name,company_name ,feedback,created_at FROM users WHERE id = ? AND feedback !='' AND isUser= 1";
mysqliq["vendor_feedback"] =
  "SELECT first_name,company_name ,feedback,created_at FROM users WHERE id = ? AND feedback !='' AND isUser = 0";

mysqliq["view_remaining"] =
  "SELECT vendorproduct.vendor_name,vendorproduct.updated_at as Pitch_date, DATEDIFF(product.placed_on, product.deliver_by) as overdue FROM vendorproduct, product WHERE vendorproduct.Pid = ?";
mysqliq["user_rating_all"] =
  "SELECT first_name,company_name ,created_at,stars,rating FROM users where isUser=1";
mysqliq["user_rating_single"] =
  "SELECT first_name,company_name ,created_at,stars,rating FROM users  where id=? AND isUser=1";
