const mail = require("@sendgrid/mail");
const sgMail = require("@sendgrid/mail");
// var nodemailer = require("nodemailer");
const { jsonResponse } = require("./commonController");

module.exports = {
  sendmail: (mail, subject, text, mssg, url) => {
    sgMail.setApiKey(process.env.SENDGRID);
    try {
      sgMail.setApiKey(process.env.SENDGRID);
      const msg = {
        to: mail,
        from: "constructionflow@gmail.com",
        subject: `${subject}`,
        text: `${text}`,
        html: `<strong>${mssg}
          ${url}</strong>`,
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error, "sendgrid");
    }
  },
  contactMail: (fullname, email, subject, message) => {
    sgMail.setApiKey(process.env.SENDGRID);

    try {
      sgMail.setApiKey(process.env.SENDGRID);
      const output = {
        to:"constructionflow@gmail.com",
        from: "constructionflow@gmail.com",
        subject: `${subject}`,
        fullname: `${fullname}`,
        html: `<h3> 
        Full Name: ${fullname}</h3><h3> Subject : ${subject} </h3><h3> Email Id : ${email} </h3><h3> Description : ${message} </h3>`,
      };
      sgMail
        .send(output)
        .then(() => {
          console.log("Contact Email sent");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error, "sendgrid");
    }
  },
};
