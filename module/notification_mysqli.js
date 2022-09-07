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

//to get all the notification of user
mysqliq['all_notification']="SELECT details from notification where userid=? ORDER BY updated_at DESC";

//to insert a notification
mysqliq['notification_set']='UPDATE notification set details=? WHERE userid=?';
mysqliq['get_notification']='SELECT details from notification where userid=? ORDER BY updated_at DESC';

//to insert a notification as pinned
mysqliq['get_notification1']='SELECT details from notification where userid=? ORDER BY updated_at DESC';
mysqliq['notification_set1']='UPDATE notification set details=? WHERE userid=?';
mysqliq['notification_delete']='DELETE FROM notification WHERE id=?'

//check user
mysqliq['find_user'] ='SELECT * from notification where userid=? '
//creating user
mysqliq['create_user'] ='INSERT into notification (userid,type) value(?,?)'


//to all  user
mysqliq['all_user']='UPDATE notification set details=? WHERE type=?';
mysqliq['get_all']='SELECT details from notification where type=?';

mysqliq['get_notification']='SELECT * from notification where user_id=? ORDER BY updated_at DESC';
mysqliq['get_pinned']='SELECT * from notification where user_id=? AND isPinned="1"';
mysqliq['notification_set1']='UPDATE notification set isPinned=? WHERE id=?  ';
mysqliq['notification_set']=" Insert into notification(user_id,title,detail,isPinned) value (?,?,?,?)";

//count_user
mysqliq['count_user_notification'] = 'SELECT COUNT(user_id) FROM notification WHERE seen = 0 && user_id = ?';
mysqliq['notification_seen'] = 'UPDATE `notification` SET `seen`= 1 WHERE user_id = ?';