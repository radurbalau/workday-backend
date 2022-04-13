const express = require("express")
const router = express.Router()
const databaseService = require("../../services/database_service")
const jwt = require("jsonwebtoken")
const passport = require("passport");
require('../passport')
const {callback} = require("pg/lib/native/query");
require('dotenv').config();


router.get("/", (req, res) => {
    res.send("Hello World!++");
});

router.post("/register",async (req, res) => {
    console.log(req.body);
    const database_response = await databaseService.registerUsers(req.body)
    if (database_response.success === false) {
        res.send(database_response)
    }else {
        const fill_pto_table = await databaseService.setupPtoEntryOneUser(database_response.item);
        res.send(fill_pto_table)
    }
})

router.get("/logged",passport.authenticate('jwt',{session: false},callback),(req,res)=>{
    //TODO: What if the email does ot exists but jwt is signed with the same key

    return res.status(200).send(({message: "is logged in", success: true,user : req.user}))
})

router.post("/login",async (req, res) => {
    console.log(req.body);
    let a = await databaseService.loginUsers(req.body)
    if (a.success !== true)
        return res.send(a)

    const payload = {
        email: req.body.email
    }

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"},callback)

    return res.status(200).send({
            message:a.message,
            item:a.item,
            success: a.success,
            token: "Bearer " + token,
        })

})

module.exports = router;
