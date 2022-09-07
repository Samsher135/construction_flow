const mysqli = require("./users_mysqli");

module.exports = class mysqli {
    async mysqli(data, row) {
        let k = mysqliq[row];
        for (var i in data) {
            k = k.replace(new RegExp('{{' + i + '}}', 'g'), data[i]);
        }
        return k;
    }

    async sfqli(data, row) {
        let k = mysqliq[row];
        for (var i in data) {
            k = k.replace(new RegExp('{{' + i + '}}', 'g'), data[i]);
        }
        return k;
    }
};


var mysqliq = []
//user
mysqliq['order_details_user']="SELECT product.type as 'product', (SELECT users.first_name FROM users WHERE users.id = product.user_id) AS 'Requested_by' ,(SELECT users.first_name FROM users WHERE users.id = vendorproduct.Uid) AS 'vendor',product.delivery_address,product.deliver_by ,product.final_total_value as 'amount',product.status as 'status' FROM product INNER JOIN vendorproduct ON vendorproduct.Pid = product.id"
mysqliq['order_details']="SELECT product.type as 'product', (SELECT users.first_name FROM users WHERE users.id = product.user_id) AS 'Requested_by' ,(SELECT users.first_name FROM users WHERE users.id = vendorproduct.Uid) AS 'vendor', product.delivery_address,product.deliver_by,product.final_total_value as 'amount1',vendorproduct.pitch_value  as 'amount', vendorproduct.product_status as 'status' FROM product INNER JOIN vendorproduct ON vendorproduct.Pid = product.id INNER JOIN vendor_services ON vendor_services.vendor_id != vendorproduct.Uid WHERE product.type = vendor_services.type"
mysqliq['orders_vendor']='SELECT COUNT(DISTINCT(accepted_vendor)) From product where status="accepted" AND updated_at  BETWEEN ? and ?  '
mysqliq['orders_user']='SELECT COUNT(DISTINCT(user_id)) From product where status="accepted" AND  updated_at BETWEEN ? and ?  '

// mysqliq['order_details']='Select users.first_name as vendor, users.first_name as ,product. from product '
