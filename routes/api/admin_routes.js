const express = require("express")
const router = express.Router()
const adminDatabaseService = require('../../services/database_service_admin')
const jwt = require("jsonwebtoken");
const {callback} = require("pg/lib/native/query");
const passport_admin_authorised = require("passport");
require('../json_authorisation/passport_authorised')
const {approvePtoRequestByAdmin, dropOnePtoDay} = require("../../services/database_service_admin");
const bcrypt = require("bcrypt");

//Login Functionality
router.post("/login",async (req,res)=>{
    const a = await bcrypt.hash("cookiesandfriends",10)
    console.log(a)
    let exist = await adminDatabaseService.loginAdmin({email:req.body.email,password:req.body.password})
    if (exist.success !== true){
        return res.send(exist)
    }

    const admin_payload = {
        email : req.body.email,
        access_rights: "privileged"
    }

    const token = jwt.sign(admin_payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"},callback)

    return res.status(200).send({
        message:exist.message,
        item:exist.item,
        success: exist.success,
        token: "Bearer " + token,
    })
})

// see not approved time off requests
router.get("/all/not-approved",passport_admin_authorised.authenticate('jwt',{session:false},callback),
    async (req,res)=>{
        const aux = await adminDatabaseService.getAllNotApprovedPtos()

        return res.status(200).send(
            aux
        )
    })

//approve time off request
router.post("/approve/user/:id",passport_admin_authorised.authenticate('jwt',{session:false},callback),
    async (req,res)=>{
        const aux = await adminDatabaseService.approvePtoRequestByAdmin(req.body)
        const drop_pto = await adminDatabaseService.dropOnePtoDay({id:req.params.id})

        return res.status(200).send(
            aux
        )
    })


//test
router.get("/test",passport_admin_authorised.authenticate('jwt',{session:false},callback),
    (req,res)=>{
    console.log("plm")
    })

module.exports = router;
