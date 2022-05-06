const passport_unauthorised = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const opts ={}
require('dotenv').config();

const databaseService = require('../../services/database_service')
const {userExists} = require("../../services/database_service");

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer')

opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET


passport_unauthorised.use(new JwtStrategy(opts,async function (jwt_payload, done) {
    const doesUserExists = await databaseService.userExists(jwt_payload.email)
    if (doesUserExists.success === true)
        done(null, doesUserExists.item)
    else
        done(null, false)

}));

