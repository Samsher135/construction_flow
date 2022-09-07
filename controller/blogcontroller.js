const { jsonResponse } = require("./commonController");
const blogmodule = require("../module/blog");
const blogs = new blogmodule();


module.exports = {
    addblog: async (req, res) => {
    try {
      let [results] = await Promise.all([blogs.addblog(req)]);
      jsonResponse(res, "inserted_product", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  }, 
   getallblog: async (req, res) => {
    try {
      let [results] = await Promise.all([blogs.getallblog(req)]);

      jsonResponse(res, "All Blogs", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },  
  get_single_blog: async (req, res) => {
    try {
      let [results] = await Promise.all([blogs.get_single_blog(req)]);
      console.log(results);
      jsonResponse(res, "1 Blog", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  total_impressions_blog: async (req, res) => {
    try {
      let [results] = await Promise.all([blogs.total_impressions_blog(req)]);
      
      jsonResponse(res, "Total Impressions", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

};
