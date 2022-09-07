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
mysqliq['all_users'] = 'SELECT * FROM users';
mysqliq['single_user'] = 'SELECT * FROM users WHERE id = ?'



mysqliq['insert_user'] = 'INSERT into users (email,password) values(?,?)';
mysqliq['signup'] = 'INSERT into users (email,phone_no,password,isUser) values(?,?,?,?)';
mysqliq['signInWithOtp'] = 'SELECT * from users WHERE phone_no=? ';
mysqliq['signupgoogle'] = 'INSERT into users (email,isUser,isverified) values(?,?,?)';
mysqliq['signInWithgoogle'] = 'SELECT * from users WHERE email=? ';
mysqliq['check_num'] = 'SELECT * FROM users WHERE phone_no = ?  && isUser = 1'
mysqliq['updateFlag'] = 'UPDATE users SET isverified="True" WHERE id=?';
mysqliq['save_token'] = 'UPDATE users SET reset_token=? WHERE id=?';
mysqliq['updatepass'] = 'UPDATE users SET password=? WHERE email=?';
mysqliq['clearreset_token'] = 'UPDATE users SET reset_token ="" WHERE email=?';
mysqliq['signInWithEmail'] = 'SELECT * from users WHERE email=? ';
mysqliq['get_user']= 'SELECT * from users WHERE id=?';
mysqliq['updateUser'] = 'UPDATE users SET first_name=?,email=?,pin=?,phone_no=?,whatsapp_no=?,state=?,city=?,company_detail_name=?,company_name=?,company_title=?,company_whatsapp_no=?,company_phone_no=?,company_email_address=?,company_building_name=?,company_house_no=?,company_street=?,company_landmark=?,company_city=?,company_state=?,company_pincode=?,fax=? WHERE id=? ';

mysqliq['add_site']= 'UPDATE users SET site=? where id=?';
mysqliq['get_site']= 'SELECT site from users where id=?';
mysqliq['get_user_month']='SELECT count(id) FROM users WHERE isUser=? AND created_at BETWEEN ? and ?'
mysqliq['add_feedback']='UPDATE users set feedback =?,rating=?, stars=? WHERE id=?' 

mysqliq['request_help'] = 'INSERT into helps (u_id,message, file_dest, file_type) values(?,?,?,?)'; 
mysqliq['deal_closed']="UPDATE vendorproduct SET product_status=?, missed_by=((pitch_value-?)/?)*100 where Pid=?  AND product_status=?"
mysqliq['user_accepted_pitch']='UPDATE vendorproduct set product_status=?,vendor_name=? WHERE Pid=? AND Uid=? '
mysqliq['product_table_status_changed']='UPDATE product set status=? , accepted_vendor=?,final_pitchValue=? WHERE id=?'

mysqliq['user_rejected_pitch']='UPDATE vendorproduct set product_status=? WHERE Pid=? AND Uid=?'

mysqliq['get_user_id']='SELECT user_id from product where id=?'
mysqliq['table_filter']='SELECT DISTINCT(type) from product where user_id=?;'
mysqliq['type_filter']='SELECT vendor_services.type,COUNT(vendor_services.type) from vendor_services INNER JOIN product ON vendor_services.type=product.type AND vendor_services.vendor_id=?  AND product.status="pending" GROUP by vendor_services.type'
mysqliq['recent_products']='SELECT *  from product where user_id=? AND status="accepted" ORDER BY updated_at DESC;'

mysqliq['construction_material_dropdown'] = 'SELECT * FROM `construction_materials`';
mysqliq['construction_chemical_dropdown'] = 'SELECT * FROM `construction_chemicals`';
mysqliq['product_name'] = 'SELECT product_name FROM products';