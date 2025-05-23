const express = require("express");
const router = express.Router();
const {
  createAccounts,
  healthCheck,
  refreshMessages,
  getMessage,
} = require("../controllers/mailController");
const {
  addLoginDetail,
  checkUserExists,
} = require("../controllers/loginController");

router.get("/", healthCheck);

router.get("/api/create", createAccounts);

router.post("/api/refresh", refreshMessages);

router.put("/api/add/user", addLoginDetail);

router.get("/api/user/:flickuserId", checkUserExists);

router.get("/api/messages/:messageId", getMessage);

module.exports = router;
