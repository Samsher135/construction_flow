const mysqli = require('./notification_mysqli');
const mysqliClass = new mysqli();
let notification_arr=[];

class Notification {
    constructor() {}

 
async setnotification1(req){
    let mysql={};
   
    let escape_data=[req.body.status,req.body.id];
    let strQuery = await mysqliClass.mysqli(mysql, 'notification_set1');
    return await global.mysql.query(strQuery, escape_data);
}
async getnotification(id){
    let mysql={}
    let escape_data=[id];
    let strQuery=await mysqliClass.mysqli(mysql,'get_notification')
    return  await global.mysql.query(strQuery,escape_data);
}
async get_pinned(id){
    let mysql={}
    let escape_data=[id];
    let strQuery=await mysqliClass.mysqli(mysql,'get_pinned')
    return  await global.mysql.query(strQuery,escape_data);
}
async setnotification(user_id,title,detail){
    let mysql={};
    let escape_data=[user_id,title,detail,'false'];
    let strQuery = await mysqliClass.mysqli(mysql, 'notification_set');
    return await global.mysql.query(strQuery, escape_data);
}

async deletenotification(req){
    let mysql={};
    let escape_data=[req.body.id];
    let strQuery = await mysqliClass.mysqli(mysql, 'notification_delete');
    return await global.mysql.query(strQuery, escape_data);
}

async count_user_notification(id){
    let mysql={}
    let escape_data=[id];
    let strQuery=await mysqliClass.mysqli(mysql,'count_user_notification')
    return  await global.mysql.query(strQuery,escape_data);
}

async notification_seen(id){
    let mysql={}
    let escape_data=[id];
    let strQuery=await mysqliClass.mysqli(mysql,'notification_seen')
    return  await global.mysql.query(strQuery,escape_data);
}


}


module.exports = Notification;
