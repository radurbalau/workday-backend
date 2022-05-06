const express = require("express")
const router = express.Router()
const adminDatabaseService = require('../../services/database_service_admin')
const jwt = require("jsonwebtoken");
const {callback} = require("pg/lib/native/query");
const passport_authorised = require("passport");
require('../json_authorisation/passport_unauthorised')
const {approvePtoRequestByAdmin, dropOnePtoDay} = require("../../services/database_service_admin");
const bcrypt = require("bcrypt");
const {ExtractJwt} = require("passport-jwt");
const opts = {};

require('dotenv').config();

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer')
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET

router.use((req,res,next)=>{
    if (req.originalUrl === "/api/admin/login") {
        next()
    }else {
        const decoded = jwt.decode(req.headers.authorization.split(" ")[1], opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET);
        if (decoded.access_rights !== "privileged")
            return next("router")
        next()
    }
})

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
router.get("/all/not-approved",passport_authorised.authenticate("jwt",{session:false},callback),
    async (req,res)=>{
        const aux = await adminDatabaseService.getAllNotApprovedPtos()

        return res.status(200).send(
            aux
        )
    })

//approve time off request
router.post("/review/user/:id",passport_authorised.authenticate('jwt',{session:false},callback),
    async (req,res)=>{
    let aux={};
        if (req.body.review === "TRUE") {
            aux = await adminDatabaseService.approvePtoRequestByAdmin(req.body)
            const drop_pto = await adminDatabaseService.dropOnePtoDay({id: req.params.id})
        }else{
            aux = await adminDatabaseService.denyPtoRequestByAdmin(req.body)
        }
        return res.status(200).send(
            aux
        )
    })

router.get("/review/user/all",passport_authorised.authenticate('jwt',{session:false},callback),
    async (req,res)=>{
        const aux = await adminDatabaseService.getAllUsers()
        return res.status(200).send(aux)
    })

//test
router.get("/test",passport_authorised.authenticate('jwt',{session:false},callback),
    (req,res)=>{
    console.log("plm")
    })

module.exports = router;
