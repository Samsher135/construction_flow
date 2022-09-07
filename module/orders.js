const mysqli = require('./orders_mysqli');
const mysqliClass = new mysqli();

class Users {
    constructor() {}

    async order_detail(filter){
        let mysql={};
        // let userid=[];
        // let vendorid=[];
        let escape_data = [filter];
        let strQuery=await mysqliClass.mysqli(mysql,'order_details');
        return await global.mysql.query(strQuery, escape_data);
        // for(var i=0;i<result.length;i++){
        //     if(result[i].accepted_vendor!==null && result[i].accepted_vendor!==undefined ){
        //         vendorid.push(result[i].accepted_vendor)
        //     }
        //     if(result[i].user_id!==null && result[i].user_id!==undefined ){
        //        userid.push(result[i].user_id)
        //     }
        // }
    }
       async order_detail_user(filter){
        let mysql={};
      
        let escape_data = [filter];
        let strQuery=await mysqliClass.mysqli(mysql,'order_details_user');
        return await global.mysql.query(strQuery, escape_data);}

    // async order_yearly_user(){
    //     let mysql={};
    //     var myVariable = new Date();
    //     var makeDate = new Date(myVariable);
    //     let nv1= makeDate.toISOString();
    //     let end_date= nv1.slice(0,5)+"01-01";
    //     makeDate.setFullYear(makeDate.getFullYear() - 1);
    //     let nv= makeDate.toISOString();
    //     let start_date= nv.slice(0,5)+"01-01";
    //     console.log(end_date,start_date)
    //     let escape_data=[start_date,end_date];
    //     let strQuery1=await mysqliClass.mysqli(mysql, 'orders_user')
    //     return await global.mysql.query(strQuery1, escape_data);
    // }

    // async order_yearly_vendor(){
    //     let mysql={};
    //     var myVariable = new Date();
    //     var makeDate = new Date(myVariable);
    //     let nv1= makeDate.toISOString();
    //     let end_date= nv1.slice(0,5)+"01-01";
    //     makeDate.setFullYear(makeDate.getFullYear() - 1);
    //     let nv= makeDate.toISOString();
    //     let start_date= nv.slice(0,5)+"01-01";
    //     console.log(end_date,start_date)
    //     let escape_data=[start_date,end_date];
    //     let strQuery1 = await mysqliClass.mysqli(mysql, 'orders_vendor')
    //     return await global.mysql.query(strQuery1, escape_data);
    // }

    // async order_monthly_vendor(){
    //     let mysql={};
    //     let end_day='31';
    //     let start_day='1';
    //     var myVariable = new Date();
    //     var makeDate = new Date(myVariable);
    //     makeDate.setMonth(makeDate.getMonth() - 1);
    //     let nv= makeDate.toISOString();
    //     let end_date= nv.slice(0,8)+"31";
    //     let start_date= nv.slice(0,8)+"01";
    //     let escape_data=[start_date,end_date];
    //     let strQuery1 = await mysqliClass.mysqli(mysql, 'orders_vendor')
    //     return await global.mysql.query(strQuery1, escape_data);
    // }

    // async order_monthly_user(){
    //     let mysql={};
    //     let end_day='31';
    //     let start_day='1';
    //     var myVariable = new Date();
    //     var makeDate = new Date(myVariable);
    //     makeDate.setMonth(makeDate.getMonth() - 1);
    //     let nv= makeDate.toISOString();
    //     let end_date= nv.slice(0,8)+"31";
    //     let start_date= nv.slice(0,8)+"01";
    //     let escape_data=[start_date,end_date];
    //     let strQuery1 = await mysqliClass.mysqli(mysql, 'orders_user')
    //     return await global.mysql.query(strQuery1, escape_data);
    // }

    // async order_weekly_vendor(){
    //     let mysql={};
    //     var start_date = new Date();
    //     var end_date = new Date();
    //     end_date.setDate(end_date.getDate()-7);
    //     let nv1= end_date.toISOString();
    //     let nv= start_date.toISOString();
    //     var end_date= nv.slice(0,10);
    //     var start_date= nv1.slice(0,10);
    //     let escape_data=[start_date,end_date];
    //     let strQuery1 = await mysqliClass.mysqli(mysql, 'orders_vendor')
    //     return await global.mysql.query(strQuery1, escape_data);
    // }

    // async order_weekly_user(){
    //     let mysql={};
    //     var start_date = new Date();
    //     var end_date = new Date();
    //     end_date.setDate(end_date.getDate()-7);
    //     let nv1= end_date.toISOString();
    //     let nv= start_date.toISOString();
    //     var end_date= nv.slice(0,10);
    //     var start_date= nv1.slice(0,10);
    //     let escape_data=[start_date,end_date];
    //     let strQuery1 = await mysqliClass.mysqli(mysql, 'orders_user')
    //     return await global.mysql.query(strQuery1, escape_data);
    // }

}

module.exports = Users;

// const object = {'a': 1, 'b': 2, 'c' : 3};

// for (const [key, value] of Object.entries(object)) {
//   console.log(key, value);
// }