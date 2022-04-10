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

router.get("/login",async (req, res) => {
    console.log(req.body);
    let a = await databaseService.loginUsers(req.body)
    if (a === "Ok")
        res.sendStatus(200)
    else
        res.status(401).send(({text:"password does not match"}))
})

//TODO: encryot passwords and search by email


module.exports = router;
