const { jsonResponse } = require("./commonController");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// var nodemailer = require("nodemailer");
const fs = require("fs");
const notificationModule = require("../module/notification");
const notification = new notificationModule();
let noti = [];
// const sgMail = require('@sendgrid/mail')
const send_grid = require("./sendgrid");

const usersModule = require("../module/users");
const { object } = require("joi");
const users = new usersModule();
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");


var storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/blogs");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var uploadBlog = multer({ storage: storage1}).single("file");

var otp = 0;

module.exports = {
  //app.get('/users', user.users);

  users: async (req, res) => {
    try {
      let [results] = await Promise.all([users.getUsersDetails()]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error, "users");
      jsonResponse(res, "error", error);
    }
  },

  // app.get('/singleuser/:user_id', user.singleUser);

  singleUser: async (req, res) => {
    try {
      req.body.id =
        typeof req.params.user_id === "undefined" ? 0 : req.params.user_id;
      let [results] = await Promise.all([users.getUser(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error, "singleUser");
      jsonResponse(res, "error", error);
    }
  },

  // app.post('/',user.insert_user)

  insert_user: async (req, res) => {
    try {
      let [results] = await Promise.all([users.insert_user(req)]);
      jsonResponse(res, "User inserted", results);
    } catch (error) {
      console.log(error, "insert_user");
      jsonResponse(res, "error", error);
    }
  },

  //app.post("/signup", formvalidator, user.signup);

  signup: async (req, res) => {
    try {
      console.log("here");
      let [existingUser] = await Promise.all([users.signInWithEmail(req)]);
      if (existingUser != "") {
        jsonResponse(res, "User Already Exists");
      } else {
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        if (password !== confirmPassword) {
          jsonResponse(res, "Passwords do not match");
        } else {
          req.body.password = await bcrypt.hash(password, 12);
          let [results] = await Promise.all([users.signup(req)]);
          let [results1] = await Promise.all([users.signInWithEmail(req)]);

          const id = results1[0]?.id;
          const token = jwt.sign(
            { email: results1[0].email, id: results1[0].id },
            "secretkey",
            { expiresIn: "30d" }
          );
          await Promise.all([
            notification.setnotification(
              id,
              "App",
              "Download our new app from Playstore"
            ),
          ]);
          jsonResponse(res, "User Created", { token, id });
        }
      }
    } catch (error) {
      console.log(error, "signup");
      jsonResponse(res, "error", error);
    }
  },

  // app.post('/otp/:user_id',user.signInWithOtp)

  signInWithOtp: async (req, res) => {
    try {
      otp = Math.floor(Math.random() * 999999 + 000000);
      req.body.id =
        typeof req.params.user_id === "undefined" ? 0 : req.params.user_id;
      let [results1] = await Promise.all([users.getUser(req)]);
      if (results1 != "") {
        client.messages
          .create({
            body: `This is your OTP ${otp} for login to Construction Flow `,
            from: "+14154964979",
            to: "+91" + results1[0].phone_no,
          })
          .then((message) => console.log(message.sid));
        jsonResponse(res, "OTP SENT");
      } else {
        jsonResponse(res, "User doesn't exists with that phone no");
      }
    } catch (error) {
      console.log(error, "signInWithOtp");
      jsonResponse(res, "error", error);
    }
  },

  // app.post('/verifyotp',user.verifyOtp)

  verifyOtp: async (req, res) => {
    try {
      if (req.body.otp == otp) {
        let [results] = await Promise.all([users.signInWithOtp(req)]);
        jsonResponse(res, "User signed In", results);
      } else {
        jsonResponse(res, "please send correct otp");
      }
    } catch (error) {
      console.log(error, "verifyOtp");
      jsonResponse(res, "error", error);
    }
  },

  //app.get('/check_number/:num',user.check_number)

  check_number: async (req, res) => {
    try {
      let [results] = await Promise.all([users.check_num(req)]);

      const id = results[0]?.id;
      const isUser = results[0]?.isUser;
      const token = jwt.sign(
        { email: results[0].email, id: results[0].id },
        "secretkey",
        { expiresIn: "30d" }
      );
      if (results.length > 0) {
        jsonResponse(res, "present", { token, id, isUser });
      } else {
        jsonResponse(res, "not_present");
      }
    } catch (error) {
      console.log(error, "check_number");
      jsonResponse(res, "error", error);
    }
  },

  //app.post('/googlesignup',user.googlsignup)

  googlsignup: async (req, res) => {
    try {
      let [existingUser] = await Promise.all([users.signInWithgoogle(req)]);
      if (existingUser.length > 0) {
        jsonResponse(res, "User Already Exists");
      } else {
        let [results] = await Promise.all([users.signupgoogle(req)]);
        let [results1] = await Promise.all([users.signInWithgoogle(req)]);
        const id = results1[0]?.id;
        const token = jwt.sign(
          { email: results1[0].email, id: results1[0].id },
          "secretkey",
          { expiresIn: "30d" }
        );
        await Promise.all([
          notification.setnotification(
            id,
            "App",
            "Download our new app from Playstore"
          ),
        ]);
        jsonResponse(res, "User Created", { token, id });
      }
    } catch (error) {
      console.log(error, "googlsignup");
      jsonResponse(res, "error", error);
    }
  },

  //app.post('/googlesignin',user.signInWithgoogleEmail)

  signInWithgoogleEmail: async (req, res) => {
    try {
      let [results] = await Promise.all([users.signInWithgoogle(req)]);
      let check_dict = { 0: false, 1: true };
      if (req.body.isUser === check_dict[results[0].isUser]) {
        const id = results[0].id;
        const token = jwt.sign(
          { email: results[0].email, id: results[0].id },
          "secretkey",
          { expiresIn: "30d" }
        );
        jsonResponse(res, "User signed In", { token, id });
      } else {
        jsonResponse(res, "Type Incorrect");
      }
      if (results[0].isverified != "True") {
        jsonResponse(res, "plz verify email by visting the link");
      }
    } catch (error) {
      console.log(error, "signInWithgoogleEmail");
      jsonResponse(res, "User doesn't exists", error);
    }
  },

  // app.post('/linktoemail/:user_id', user.sendlinktoemail)

  sendlinktoemail: async (req, res) => {
    try {
      var date = new Date();

      var id = req.params.user_id;
      let [results1] = await Promise.all([users.getUser(id)]);
      var mail = {
        id: results1[0].id,
        created: date.toString(),
      };

      const token_mail_verification = jwt.sign(
        mail,
        "samsingh9892885@gmail.com",
        { expiresIn: "1d" }
      );
      var isUser = results1[0].isUser;

      var url =
        process.env.FRONTEND_PORT +
        "/verify/" +
        id +
        "/" +
        token_mail_verification +
        "/" +
        isUser;

      let s = await Promise.all([
        send_grid.sendmail(
          results1[0].email,
          "Verification Link",
          "Click on the link to verifiy your email",
          "Your verification link is",
          url
        ),
      ]);

      jsonResponse(res, "Mail is send", s);
    } catch (error) {
      console.log(error, "sendlinktoemail");
      jsonResponse(res, "error", error);
    }
  },

  //app.post('/verifing/:id/:token/:isUser', user.verifyemail)

  verifyemail: async (req, res) => {
    try {
      token = req.params.token;
      if (token) {
        jwt.verify(token, "samsingh9892885@gmail.com", async (e, decoded) => {
          if (e) {
            res.sendStatus(403);
          } else {
            id = decoded.id;
            req.params.id = id;
            let [results2] = await Promise.all([users.updateFlag(req)]);
            let isUser = req.params.isUser;
            jsonResponse(res, "verified", { results2, isUser });
          }
        });
      } else {
        res.sendStatus(403);
      }
    } catch (error) {
      console.log(error, "verifyemail");
      jsonResponse(res, "error", error);
    }
  },

  //app.post('/resetpass/:email', user.resetpass)

  resetpass: async (req, res) => {
    try {
      var date = new Date();
      let [results1] = await Promise.all([users.getuserbyemail(req)]);
      var id = results1[0].id;
      var isUser = results1[0].isUser;
      var mail = {
        id: results1[0].id,
        created: date.toString(),
      };
      token_mail_verification = jwt.sign(mail, "samsingh9892885@gmail.com", {
        expiresIn: "1d",
      });

      var url =
        process.env.FRONTEND_PORT +
        "/resetpass/" +
        id +
        "/" +
        token_mail_verification +
        "/" +
        isUser;

      let s = await Promise.all([
        send_grid.sendmail(
          results1[0].email,
          "reset Link",
          "Click on the link to reset password",
          "Your password reset link is",
          url
        ),
      ]);

      jsonResponse(res, "Mail is send", s);
    } catch (error) {
      console.log(error, "resetpass");
      jsonResponse(res, "error", error);
    }
  },

  //app.post('/verifyresetlink/:id/:token', user.verifyresetlink)

  verifyresetlink: async (req, res) => {
    try {
      token = req.params.token;
      if (token) {
        jwt.verify(token, "samsingh9892885@gmail.com", async (e, decoded) => {
          if (e) {
            res.sendStatus(403);
          } else {
            id = decoded.id;
            req.body.id = id;
            await Promise.all([users.save_token(token_mail_verification, req)]);

            jsonResponse(res, "reset link verified");
          }
        });
      } else {
        res.sendStatus(403);
      }
    } catch (error) {
      console.log(error, "verifyresetlink");
      jsonResponse(res, "error", error);
    }
  },

  //app.post('/updatepass/:password/:email', user.updatepass)

  updatepass: async (req, res) => {
    try {
      let [results1] = await Promise.all([users.getuserbyemail(req)]);
      if (results1[0].reset_token !== " ") {
        let newpassword = req.params.password;
        let password = await bcrypt.hash(newpassword, 12);
        let [results2] = await Promise.all([users.updatepass(password, req)]);
        jsonResponse(res, "password reset successfull");
        let [clear] = await Promise.all([users.clearreset_token(req)]);
      } else {
        jsonResponse(res, "not authorized user");
      }
    } catch (error) {
      console.log(error, "updatepass");
      jsonResponse(res, "error", error);
    }
  },

  // app.post('/email/',isverified, user.signInWithEmail)

  signInWithEmail: async (req, res) => {
    try {
      let [results] = await Promise.all([users.signInWithEmail(req)]);
      let check_dict = { 0: false, 1: true };
      if (req.body.isUser === check_dict[results[0].isUser]) {
        let sqlpassword = results[0].password;
        const isPasswordCorrect = await bcrypt.compare(
          req.body.password,
          sqlpassword
        );
        if (isPasswordCorrect) {
          const id = results[0].id;
          const token = jwt.sign(
            { email: results[0].email, id: results[0].id },
            "secretkey",
            { expiresIn: "30d" }
          );
          jsonResponse(res, "User signed In", { token, id });
        } else {
          jsonResponse(res, "Password Incorrect");
        }
      } else {
        jsonResponse(res, "Type Incorrect");
      }
      if (results[0].isverified != "True") {
        jsonResponse(res, "plz verify email by visting the link");
      }
    } catch (error) {
      console.log(error);
    }
  },

  //app.post('/updateUser/:user_id',user.updateUser)

  updateUser: async (req, res) => {
    try {
      req.body.id =
        typeof req.params.user_id === "undefined" ? 0 : req.params.user_id;

      let [results] = await Promise.all([users.updateUser(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error, "updateUser");
      jsonResponse(res, "error", error);
    }
  },

  //app.get('/get_user/:user_id',user.get_user)

  get_user: async (req, res) => {
    try {
      req.body.id =
        typeof req.params.user_id === "undefined" ? 0 : req.params.user_id;

      let [results] = await Promise.all([users.get_user(req)]);
      // var date1 = new Date()  //todays date
      // var date2 = results[0].updated_at; //response date
      // var diffDays = parseInt((date1 - date2) / (1000 * 60 * 60 * 24), 10);
      // console.log(diffDays);
      jsonResponse(res, "Got the details of user", results);
    } catch (error) {
      console.log(error, "get_user");
      jsonResponse(res, "error", error);
    }
  },

  //app.post('/add_site/:user_id',user.add_site)

  add_site: async (req, res) => {
    try {
      req.body.id =
        typeof req.params.user_id === "undefined" ? 0 : req.params.user_id;
      let [results1] = await Promise.all([users.get_site(req)]);

      let arr = [];
      let temp = results1[0]?.site?.length ? JSON.parse(results1[0].site) : [];

      if (results1[0].site !== null) {
        for (var i = 0; i < temp?.length; i++) {
          arr.push(JSON.parse(results1[0]?.site)[i]);
        }

        arr.push(req.body);
      } else arr = [req.body];

      let [results] = await Promise.all([users.add_site(req, arr)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error, "add_site");
      jsonResponse(res, "error", error);
    }
  },

  //app.post('/update_site/:user_id',user.update_site)

  update_site: async (req, res) => {
    try {
      req.body.id =
        typeof req.params.user_id === "undefined" ? 0 : req.params.user_id;

      let [results] = await Promise.all([users.update_site(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      jsonResponse(res, "error", error);
    }
  },

  // app.get('/get_site/:user_id',user.get_site)

  get_site: async (req, res) => {
    try {
      req.body.id =
        typeof req.params.user_id === "undefined" ? 0 : req.params.user_id;
      let [results1] = await Promise.all([users.get_site(req)]);
      let temp = results1?.length ? JSON.parse(results1[0]?.site) : [];
      jsonResponse(res, "sucess", temp);
    } catch (error) {
      console.log(error, "get_site");
      jsonResponse(res, "error", error);
    }
  },

  //app.post('/feedback/:user_id',user.add_feedback)

  add_feedback: async (req, res) => {
    try {
      req.body.id =
        typeof req.params.user_id === "undefined" ? 0 : req.params.user_id;
      let [results] = await Promise.all([users.add_feedback(req)]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error, "add_feedback");
      jsonResponse(res, "error", error);
    }
  },

  // app.post('/request_help/:user_id', upload.single('attachment'), user.request_help)

  request_help: async (req, res) => {
    try {
      req.body.id =
        typeof req.params.user_id === "undefined" ? 0 : req.params.user_id;
      let [results] = await Promise.all([users.request_help(req)]);
      jsonResponse(res, "file inserted");
    } catch (error) {
      console.log(error, "request_help");
      jsonResponse(res, "error", error);
    }
  },

  //app.post('/user_accepted_pitch/:user_id',user.user_accepted_pitch)

  user_accepted_pitch: async (req, res) => {
    try {
      req.body.id =
        typeof req.params.user_id === "undefined" ? 0 : req.params.user_id;
      let vendor = await Promise.all([users.get_vendor(req)]);

      const company_name = vendor[0][0]?.company_name;
      let [deal_closed] = await Promise.all([users.deal_closed(req)]);
      let [results] = await Promise.all([
        users.user_accepted_pitch(req, company_name),
      ]);
      let [results1] = await Promise.all([
        users.product_table_status_changed(req),
      ]);
      notification.setnotification(
        req.body.Uid,
        "Pitch accepted",
        `Your pitch has been accepted ${req.body.pitch_value}`
      );
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error, "user_accepted_pitch");
      jsonResponse(res, "error", error);
    }
  },

  //app.post('/user_rejected_pitch/:user_id',user.user_rejected_pitch)

  user_rejected_pitch: async (req, res) => {
    try {
      req.body.id =
        typeof req.params.user_id === "undefined" ? 0 : req.params.user_id;
      let [results] = await Promise.all([users.user_rejected_pitch(req)]);

      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error, "user_rejected_pitch");
      jsonResponse(res, "error", error);
    }
  },

  // app.get('/tabel_filter/:user_id',user.Tablefilter)

  Tablefilter: async (req, res) => {
    try {
      req.body.id =
        typeof req.params.user_id === "undefined" ? 0 : req.params.user_id;
      let result = await Promise.all([users.Table_filter(req)]);
      jsonResponse(res, "sucess", result);
    } catch (error) {
      console.log(error, "Tablefilter");
      jsonResponse(res, "error", error);
    }
  },

  Typefilter: async (req, res) => {
    try {
      req.body.id =
        typeof req.params.user_id === "undefined" ? 0 : req.params.user_id;
      let result = await Promise.all([users.Type_filter(req)]);
      jsonResponse(res, "sucess", result);
    } catch (error) {
      console.log(error, "Typefilter");
      jsonResponse(res, "error", error);
    }
  },

  //-------------------------------------notifications------------------------------------------------------------

  //app.get('/get_notification/:user_id',user.get_notification)

  get_notification: async (req, res) => {
    try {
      let id = req.params.user_id;
      let [results] = await Promise.all([notification.getnotification(id)]);
      jsonResponse(res, "all", results);
    } catch (error) {
      console.log(error, "get_notification");
      jsonResponse(res, "error", error);
    }
  },

  //app.get('/get_pinned/:user_id',user.get_pinned)

  get_pinned: async (req, res) => {
    try {
      let id = req.params.user_id;
      let [results] = await Promise.all([notification.get_pinned(id)]);
      jsonResponse(res, "all", results);
    } catch (error) {
      console.log(error, "get_pinned");
      jsonResponse(res, "error", error);
    }
  },

  // app.post('/set_notification1/:user_id',user.set_notification1)

  set_notification1: async (req, res) => {
    try {
      let [results] = await Promise.all([notification.setnotification1(req)]);
      jsonResponse(res, "all", results);
    } catch (error) {
      console.log(error, "set_notification1");
      jsonResponse(res, "error", error);
    }
  },

  //app.post('/delete_notification/:user_id',user.delete_notification)

  delete_notification: async (req, res) => {
    try {
      let [results] = await Promise.all([notification.deletenotification(req)]);
      jsonResponse(res, "all", results);
    } catch (error) {
      console.log(error, "delete_notification");
      jsonResponse(res, "error", error);
    }
  },

  count_user_notification: async (req, res) => {
    try {
      let id = req.params.user_id;
      let [results] = await Promise.all([
        notification.count_user_notification(id),
      ]);
      jsonResponse(res, "all", results);
    } catch (error) {
      console.log(error, "get_notification");
      jsonResponse(res, "error", error);
    }
  },
  notification_seen: async (req, res) => {
    try {
      let id = req.params.user_id;
      let [results] = await Promise.all([notification.notification_seen(id)]);
      jsonResponse(res, "all", results);
    } catch (error) {
      console.log(error, "get_notification");
      jsonResponse(res, "error", error);
    }
  },

  // app.get('/recent_products/:user_id',user.recent_products)

  recent_products: async (req, res) => {
    try {
      req.body.id =
        typeof req.params.user_id === "undefined" ? 0 : req.params.user_id;

      let [results] = await Promise.all([users.recent_products(req)]);

      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error, "recent_products");
      jsonResponse(res, "error", error);
    }
  },
  //superadmin
  get_user_month: async (req, res) => {
    try {
      console.log("here in get_user_month");
      let [results] = await Promise.all([
        users.get_user_month(req.params.type),
      ]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  construction_material_dropdown: async (req, res) => {
    try {
      let [results] = await Promise.all([
        users.construction_material_dropdown(),
      ]);
      // console.log(results[0]);
      // let resultss = results[0].cement_brands;
      // let result = JSON.parse(resultss);
      // console.log(result[0],"mysss");
      // console.log(typeof(result[0]));
      // for (const value of Object.values(results[0])) {
      //      results = JSON.parse(value)
      //      console.log(results);
      //  }
      // jsonResponse(res, "sucess", results)

      let xyz = {};
      let arr = Object.values(results[0]);
      let key = Object.keys(results[0]);
      for (let i = 0; i < arr.length; i++) {
        if (i == 0) {
          xyz[key[i]] = arr[i];
          continue;
        }
        xyz[key[i]] = JSON.parse(arr[i]);
      }
      console.log(xyz);
      jsonResponse(res, "sucess", xyz);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  construction_chemical_dropdown: async (req, res) => {
    try {
      let [results] = await Promise.all([
        users.construction_chemical_dropdown(),
      ]);
      let xyz = {};
      let arr = Object.values(results[0]);
      let key = Object.keys(results[0]);
      for (let i = 0; i < arr.length; i++) {
        if (i == 0) {
          xyz[key[i]] = arr[i];
          continue;
        }
        xyz[key[i]] = JSON.parse(arr[i]);
      }
      console.log(xyz);
      jsonResponse(res, "sucess", xyz);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  product_name: async (req, res) => {
    try {
      let [results] = await Promise.all([users.product_name()]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  //superadmin
  // orders_details:async(req,res)=>{
  //     try {
  //         let [results] = await Promise.all([users.order_detail(req.params.filter)])
  //         jsonResponse(res, "sucess", results)

  //     } catch (error) {

  //         console.log(error);
  //         jsonResponse(res, "error", error);
  //     }
  // },

  uploadadd: async (req, res) => {
    try {
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(500).json(err);
        } else if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).send(req.file);
      });
    } catch (error) {
      jsonResponse(res, "error", error);
    }
  },
  
  upload_get: async (req, res) => {

    let filenames = fs.readdirSync('./upload/images');
    filenames.forEach((file) => {
    console.log("File:", file);
});
    res.send(filenames)


  },

uploadadd_blog: async (req, res) => {
    try {
      uploadBlog(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(500).json(err);
        } else if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).send(req.file);
      });
    } catch (error) {
      jsonResponse(res, "error", error);
    }
  },
  
  upload_blog_get: async (req, res) => {

    let filenames = fs.readdirSync('./upload/blogs');
    filenames.forEach((file) => {
    console.log("File:", file);
});
    res.send(filenames)


  },

  sendemailcontact: async (req, res) => {
    try {
      const { fullname, email, subject, message } = req.body;

 
      send_grid.contactMail(fullname, email, subject, message);

      res.send("Email sent  successfully");
    } catch (error) {
      res.status(400).json(error);
      console.log(error);
    }
  },
};
