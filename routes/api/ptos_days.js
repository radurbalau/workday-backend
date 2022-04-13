const express = require("express")
const router = express.Router()
const passport = require("passport");
const {callback} = require("pg/lib/native/query");
const database_service = require("../../services/database_service")
const {getPtoDaysRemaining, dropOnePtoDay} = require("../../services/database_service");
require('../passport')

router.get("/:id", passport.authenticate('jwt',{session: false},callback),async (req, res) => {
    const  resp = await getPtoDaysRemaining({id:req.params.id});

    res.send(resp)
});

router.put("/:id", passport.authenticate('jwt',{session: false},callback),async (req, res) => {
    let resp_one_pto = await dropOnePtoDay({id:req.params.id});
    let resp_reining_ptos = await getPtoDaysRemaining({id:req.params.id});

    res.send(resp_reining_ptos)
});

module.exports = router;
