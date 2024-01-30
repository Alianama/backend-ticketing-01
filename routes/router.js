const express = require("express");
const router = express.Router();
const getdataHandler = require("./handler/ticketHandler/getdataHandler");
const postdatahandler = require("./handler/ticketHandler/postdatahandler");
const deletedataHandler = require("./handler/ticketHandler/deletedataHandler");
const updateDataHandler = require("./handler/ticketHandler/updatedataHandler");
const loginHandler = require("./handler/usersHandler/loginHandler");
const registerHandler = require("./handler/usersHandler/registerHandler");

router.get("/get", getdataHandler);

router.post("/add", postdatahandler);

router.delete("/delete/:id", deletedataHandler);

router.put("/update", updateDataHandler);

router.post("/login", loginHandler);

router.post("/register", registerHandler);

module.exports = router;
