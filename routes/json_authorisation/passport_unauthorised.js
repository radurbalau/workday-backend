const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const opts ={}
require('dotenv').config();

const databaseService = require('../../services/database_service')
const databaseServiceAdmin = require('../../services/database_service_admin')


opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer')

opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET


passport.use(new JwtStrategy(opts,async function (jwt_payload, done) {
    const doesUserExists = await databaseService.userExists(jwt_payload.email)
    const doesAdminExists = await databaseServiceAdmin.adminExists(jwt_payload.email)
    if (doesUserExists.success === true)
        done(null, {"adminExists":doesUserExists.item,"isPrivileged":"unprivileged"})
    else if (doesAdminExists.success === true){
        done(null, {"adminExists" : doesAdminExists.item,"isPrivileged":"privileged"})
    }else {
        done(null, false)
    }

}));