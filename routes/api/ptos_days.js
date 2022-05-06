const express = require("express")
const router = express.Router()
const passport = require("passport");
const {callback} = require("pg/lib/native/query");
const {getPtoDaysRemaining, getPtoRequestsForUser,requestOnePtoDayOnSpecificDate} = require("../../services/database_service");
require('../json_authorisation/passport_unauthorised')

//get pto days remaining for a user
// - user_id
router.get("/:id", passport.authenticate('jwt',{session: false},callback),async (req, res) => {
    const  resp = await getPtoDaysRemaining({id:req.params.id});

    res.send(resp)
});

router.get("/requests/:id", passport.authenticate('jwt',{session: false},callback),async (req, res) => {

    const  resp = await getPtoRequestsForUser({id:req.params.id});

    res.send(resp)
});

// router.get("/all", passport.authenticate('jwt',{session: false},callback),async (req, res) => {
//     const  resp = await getPtoDaysRemaining({id:req.params.id});
//F
//     res.send(resp)
// });

//Request a day off
// user-id
router.post("/:id", passport.authenticate('jwt',{session: false},callback),async (req, res) => {
    const  resp = await requestOnePtoDayOnSpecificDate({id:req.params.id},req.body);

    res.send(resp)
});


// router.put("/:id", passport.authenticate('jwt',{session: false},callback),async (req, res) => {
//     let resp_one_pto = await dropOnePtoDay({id:req.params.id});
//     let resp_reining_ptos = await getPtoDaysRemaining({id:req.params.id});
//
//     res.send(resp_reining_ptos)
// });

module.exports = router;
