const { jsonResponse } = require("./commonController");
const announcementmodule = require("../module/announcement");
const announcements = new announcementmodule();

module.exports = {
  insert_announcement: async (req, res) => {
    try {
      let [result] = await Promise.all([
        announcements.insert_announcement(req),
      ]);
      jsonResponse(res, "Announcement inserted", result);
    } catch (error) {
      console.log(error, "insert_announcement");
      jsonResponse(res, "error", error);
    }
  },
  announcement_info: async (req, res) => {
    try {
      let [results] = await Promise.all([announcements.announcement_info(req)]);

      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },

  announcement_info_single: async (req, res) => {
    try {
      let [results] = await Promise.all([
        announcements.announcement_info_single(req),
      ]);
      console.log(results);
      jsonResponse(res, "sucess", results);
    } catch (error) {
      console.log(error);
      jsonResponse(res, "error", error);
    }
  },
};
