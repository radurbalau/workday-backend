const passport_authorised = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const opts ={}
require('dotenv').config();

const databaseServiceAdmins = require('../../services/database_service_admin')
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer')

opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET


passport_authorised.use(new JwtStrategy(opts,async function (jwt_payload, done) {
    const doesUserExists = await databaseServiceAdmins.adminExists(jwt_payload.email)

    if (doesUserExists.success === true && jwt_payload.access_rights === "privileged")
        done(null, doesUserExists.item)
    else
        done(null, false)

}));
