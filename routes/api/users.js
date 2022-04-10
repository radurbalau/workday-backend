const express = require("express")
const router = express.Router()
const uuid = require("uuid")
const databaseService = require("../../services/database_service")

router.get("/", (req, res) => {
    res.send("Hello World!++");
});

router.post("/register",(req,res)=>{

    console.log(req.body);
    databaseService.registerUsers(req.body)
    res.sendStatus(200)
})

router.get("/login",(req,res)=>{
    console.log(req.body);
    databaseService.loginUsers(req.body)
    res.sendStatus(200)
})

//TODO: encryot passwords and search by email


module.exports = router;
