const express = require("express")
const router = express.Router()
const uuid = require("uuid")
const databaseService = require("../../services/database_service")
const bcrypt = require('bcrypt')

router.get("/", (req, res) => {
});

module.exports = router;
