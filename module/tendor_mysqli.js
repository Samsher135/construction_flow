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

mysqliq['insert_tendor'] = 'INSERT INTO `tendor`(`area`, `requirements`, `ground_type`, `no_of_floors`, `no_of_rooms`, `no_of_kitchens`, `no_of_bathrooms`, `budget`, `bid_end_date`, `work_description`, `status`, `applied_by`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
mysqliq['insert_bid'] = 'INSERT INTO `mybids`(`Tid`, `Vid`, `bid_end_date`, `status`, `per_sq_ft_charges`, `elevation_charges`, `extra_charges`, `grand_total`,`company_name`) VALUES (?,?,?,?,?,?,?,?,?)';
mysqliq['get_company_name'] = 'SELECT company_name FROM users WHERE id = ?';
mysqliq['vendor_id'] ='SELECT id FROM users WHERE isUser = 0';

mysqliq['tendor_details'] = 'SELECT * FROM tendor WHERE id = ?';

// mysqliq['bid_end_date'] = 'SELECT bid_end_date FROM tendor WHERE id = ?';

mysqliq['update_status_vendorid_bidamount'] = 'UPDATE `tendor` SET `status`=?,`accepted_vendor`=?,`bid_amount`=? WHERE id = ?';
mysqliq['update_bidstatus'] = 'UPDATE `mybids` SET `status`=? WHERE Tid = ? && Vid = ?';

mysqliq['get_my_bids'] =  "SELECT * FROM `mybids` WHERE id = ?"

mysqliq['counts'] = "SELECT COUNT(status) as 'accepted',(SELECT COUNT(status) FROM mybids WHERE status = 'Bidded') AS 'Inprocess',(SELECT COUNT(status) FROM mybids WHERE status = 'rejectedbid') AS 'rejected' FROM mybids WHERE status = 'acceptedbid'";
mysqliq['my_tendors_list'] = "SELECT mybids.Tid,tendor.area as 'Area',mybids.created_at as 'Date',mybids.status FROM mybids INNER JOIN tendor ON mybids.Tid = tendor.id WHERE tendor.applied_by = ?";

mysqliq['my_bids_list'] = "SELECT mybids.Tid,mybids.company_name,mybids.bid_end_date as 'bid_end_date',mybids.status,mybids.grand_total FROM mybids INNER JOIN tendor ON mybids.Tid = tendor.id WHERE mybids.Vid = ?";

mysqliq['available_tendors'] = "SELECT tendor.id as 'Tid',tendor.work_description,tendor.bid_end_date FROM tendor WHERE tendor.status = 'pending'";
mysqliq['available_tendors_least_bids'] = "SELECT tendor.id as 'Tid',(SELECT COUNT(mybids.id) FROM mybids WHERE mybids.Tid = tendor.id && mybids.status = 'Bidded') as 'Bids',tendor.work_description,tendor.bid_end_date FROM tendor WHERE tendor.status = 'pending' ORDER BY Bids";
mysqliq['available_tendors_most_bids'] = "SELECT tendor.id as 'Tid',(SELECT COUNT(mybids.id) FROM mybids WHERE mybids.Tid = tendor.id && mybids.status = 'Bidded') as 'Bids',tendor.work_description,tendor.bid_end_date FROM tendor WHERE tendor.status = 'pending' ORDER BY Bids DESC";

mysqliq['view_details_mytendor'] = "SELECT users.*,tendor.*,mybids.* FROM tendor INNER JOIN mybids ON mybids.Tid = tendor.id INNER JOIN users ON users.id = mybids.Vid WHERE tendor.id = ?";
mysqliq['view_details_mybid'] = "SELECT users.*,tendor.*,mybids.* FROM tendor INNER JOIN mybids ON mybids.Tid = tendor.id INNER JOIN users ON users.id = tendor.applied_by WHERE tendor.id = ?";
