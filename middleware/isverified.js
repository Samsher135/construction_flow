const {
    jsonResponse
} = require("../controller/commonController");
// const usercont = require("../controller/userController");
const usersModule = require('../module/users');
const users = new usersModule();

const isverified = async (req, res, next) => {
    try {
        let [results] = await Promise.all([users.signInWithEmail(req)])
        if (results != '') {
        if(results[0].isverified != "True"){
            const id = results[0].id;
            jsonResponse(res, "Please Check your email for verification link", {id});
            throw new Error("Please Check your email for verification link");
        }
        next();
        }else{
            jsonResponse(res, "User doesn't exists");
        }

    } catch (error) {
        console.log(error);
    }
};

module.exports = isverified;