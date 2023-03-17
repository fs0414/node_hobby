const express = require("express");
const router = express.Router();
const { UsersGet } = require("../api/controller/UserController");

router.get("/users", UsersGet);

module.exports = router;
