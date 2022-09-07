const express = require("express");
const app = express.Router();
const api = require("../controller/api");
const user = require("../controller/userController");
const vendor = require("../controller/vendorController");
const isverified = require("../middleware/isverified");
const formvalidator = require("../middleware/formvalidation");
const upload = require("../middleware/multer");
const announcement = require("../controller/announcementcontroller");
const blog = require("../controller/blogcontroller");
const advertisement = require("../controller/advertisementcontroller");
const dashboard = require("../controller/dashboardcontroller");
const orders = require("../controller/ordersController");
const products = require("../controller/productspageController");
const crm = require("../controller/crmController");

app.get("/users", user.users);
app.get("/singleuser/:user_id", user.singleUser);
app.post("/", user.insert_user);
app.post("/email/", isverified, user.signInWithEmail);
app.get("/get_user/:user_id", user.get_user);
app.post("/otp/:user_id", user.signInWithOtp);
app.get("/check_number/:num", user.check_number);
app.post("/googlesignup", user.googlsignup);
app.post("/googlesignin", user.signInWithgoogleEmail);
app.post("/verifyotp", user.verifyOtp);
app.post("/linktoemail/:user_id", user.sendlinktoemail);
app.post("/verifing/:id/:token/:isUser", user.verifyemail);
app.post("/verifyresetlink/:id/:token", user.verifyresetlink);
app.post("/resetpass/:email", user.resetpass);
app.post("/updatepass/:password/:email", user.updatepass);
app.post("/signup", user.signup);
app.post("/updateUser/:user_id", user.updateUser);
app.post("/add_site/:user_id", user.add_site);
app.post("/update_site/:user_id", user.update_site);

app.get("/get_notification/:user_id", user.get_notification);
app.post("/set_notification1/:user_id", user.set_notification1);
app.post("/delete_notification/:user_id", user.delete_notification);
app.get("/get_pinned/:user_id", user.get_pinned);
app.get("/count_user_notification/:user_id", user.count_user_notification);
app.get("/notification_seen/:user_id", user.notification_seen);

app.post("/feedback/:user_id", user.add_feedback);
app.post("/user_accepted_pitch/:user_id", user.user_accepted_pitch);
app.post("/user_rejected_pitch/:user_id", user.user_rejected_pitch);

app.post("/add_service/:user_id", vendor.add_service);
app.post("/delete_service/:user_id", vendor.delete_service);
app.get("/get_services/:user_id", vendor.get_services);
app.get("/get_services_by_filter/:user_id", vendor.get_services_by_filter);
app.get("/new_leads/:user_id", vendor.new_leads);
app.get("/get_pending_leads/:user_id", vendor.get_pending_leads);
app.get("/get_saved_leads/:user_id", vendor.get_saved_leads);
app.get("/products/:user_id", vendor.products);
app.get("/total_services/:user_id", vendor.total_services);
app.get("/maximum_sales_vendor/:user_id", vendor.maximum_sales_vendor);
app.get("/most_requested_service/:user_id", vendor.most_requested_service);
app.get("/sales_vendor/:user_id", vendor.sales_vendor);
app.post("/vendor_contribution/:user_id", vendor.vendor_contribution);
app.post("/vendor_pitched/:user_id", vendor.vendor_pitched);
app.post("/vendor_rejected/:user_id", vendor.vendor_rejected);
app.post("/vendor_month_sale/:user_id", vendor.vendor_month_sale);

app.get("/get_site/:user_id", user.get_site);

app.post(
  "/request_help/:user_id",
  upload.single("attachment"),
  user.request_help
);
app.get("/vendor_sale_percentage/:user_id", vendor.vendor_sale_percentage);
app.get("/most_sold_product/:user_id", vendor.most_sold_product);
app.post("/get_price_detail/:user_id", vendor.get_price_detail);
app.get("/tabel_filter/:user_id", user.Tablefilter);
app.get("/recent_products/:user_id", user.recent_products);
// app.get('/type_filter/:user_id',user.Typefilter)

app.get(
  "/no_of_pending_requests_by_type/:user_id",
  vendor.no_of_pending_requests_by_type
);
app.post("/contact", user.sendemailcontact);
//super admin
app.get("/get_user_month/:type", user.get_user_month);
app.get("/orders_details/:filter", orders.orders_details);
app.get("/orders_graph_user/:filter", orders.orders_graph_user);
app.get("/orders_graph_vendor/:filter", orders.orders_graph_vendor);
app.get("/order_detail_user/:filter", orders.order_detail_user);

app.get("/top_product_month", products.top_product_month);
app.get("/popular_service", products.popular_services);
app.get("/product_sales%", products.product_sales_perc);
app.get("/regional_sales", products.regional_sales);
app.get("/piechart", products.piechart);
app.get("/product_performance_high", products.product_performance_high);

app.get("/customer_table/:n", crm.customer_table);
app.get("/view_customer/:id", crm.view_customer);
app.get("/view_vendor/:id", crm.view_vendor);
app.get("/all_feedback", crm.all_feedback);
app.get("/user_feedback/:id", crm.user_feedback);
app.get("/vendor_feedback/:id", crm.vendor_feedback);
app.get("/view_remaining/:id", crm.view_remaining);
app.get("/user_rating_all", crm.user_rating_all);
app.get("/user_rating_single/:id", crm.user_rating_single);

// for Blog super admin
app.post("/addblog", blog.addblog);
app.get("/all_blog", blog.getallblog);
app.get("/single_blog/:id", blog.get_single_blog);
app.get("/total_impressions_blog", blog.total_impressions_blog);

// for advertisements
app.post("/enter_advertisement", advertisement.enter_advertisement);
app.get("/all_advertisement", advertisement.getalladv);
app.get("/advertisement/:id", advertisement.get_single_adv);
app.get("/getalladvertisementinsc", advertisement.getalladvertisementinsc);
app.get("/getalladvertisementdesc", advertisement.getalladvertisementdesc);
app.get(
  "/getalladvertisementpopular",
  advertisement.getalladvertisementpopular
);
app.get("/total_impressions", advertisement.total_impressions);
app.get("/Top_advertisement", advertisement.Top_advertisement);
app.get(
  "/advertisement_performance_filter/:filter",
  advertisement.advertisement_performance_filter
);

//dashboard

app.get("/user_vendor_count", dashboard.user_vendor_count);
app.get("/total_vendor", dashboard.total_vendor);
app.get("/total_user", dashboard.total_user);
app.get("/recent_users", dashboard.recent_users);
app.get("/recent_vendors", dashboard.recent_vendors);
app.get("/sales_today", dashboard.sales_today);
app.get("/sales_yesterday", dashboard.sales_yesterday);
app.get("/recent_orders_newest", dashboard.recent_orders_newest);
app.get("/recent_orders_filter/:filter", dashboard.recent_orders_filter);
app.get("/performance_this_month/:type", dashboard.performance_this_month);
app.get(
  "/performance_previous_month/:type",
  dashboard.performance_previous_month
);
// app.get("/sales_by_state", dashboard.sales_by_state);
app.get("/available_filter", dashboard.available_filter);
app.get("/pendingreq", dashboard.pendingreq);
app.get(
  "/approve_reject_v_services/:id/:approve_status",
  dashboard.approve_reject_v_services
);
app.get("/no_of_pitch", dashboard.no_of_pitch);
app.post("/admin_pitched/:user_id", dashboard.admin_pitched);

app.get("/construction_material_dropdown", user.construction_material_dropdown);
app.get("/construction_chemical_dropdown", user.construction_chemical_dropdown);
app.get("/product_name", user.product_name);
app.post("/upload", user.uploadadd);
app.get("/upload_get", user.upload_get);
app.post("/upload_blog", user.uploadadd_blog);
app.get("/upload_blog_get", user.upload_blog_get);

// announcement

app.post("/insert_announcement", announcement.insert_announcement);
app.get("/announcement_info/", announcement.announcement_info);
app.get("/announcement_info_single/:id", announcement.announcement_info_single);

module.exports = app;
