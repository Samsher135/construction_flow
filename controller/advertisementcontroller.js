const { jsonResponse } = require("./commonController");
const advertisementmodule = require("../module/advertisement");
const advertisements = new advertisementmodule();


module.exports = {
  enter_advertisement: async (req, res) => {
    try {
      let [results] = await Promise.all([advertisements.addadvertisement(req)]);
      jsonResponse(res, "inserted_product", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  getalladv: async (req, res) => {
    try {
      let [results] = await Promise.all([advertisements.getalladvertisement(req)]);

      jsonResponse(res, "your data", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  get_single_adv: async (req, res) => {
    try {
      let [results] = await Promise.all([advertisements.get_single_ad(req)]);
      console.log(results);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  getalladvertisementinsc: async (req, res) => {
    try {
      let [results] = await Promise.all([
        advertisements.getalladvertisementinsc(req),
      ]);

      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  getalladvertisementdesc: async (req, res) => {
    try {
      let [results] = await Promise.all([
        advertisements.getalladvertisementdesc(req),
      ]);

      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  getalladvertisementpopular: async (req, res) => {
    try {
      let [results] = await Promise.all([
        advertisements.getalladvertisementpopular(req),
      ]);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  total_impressions: async (req, res) => {
    try {
      let [results] = await Promise.all([advertisements.total_impressions(req)]);
      
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  Top_advertisement: async (req, res) => {
    try {
      let [results] = await Promise.all([advertisements.Top_advertisement(req)]);
      
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
  advertisement_performance_filter: async (req, res) => {
    try {
      let [results] = await Promise.all([
        advertisements.advertisement_performance_filter(req),
      ]);
      console.log(results);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
};
