const knex =  require('./knex_service')
const bcrypt = require("bcrypt")
const User = require("../models/UserAuthModel")
const {success} = require("../models/UserAuthModel");

const registerUsers = async (userData) => {
    console.log("in-register")
    userData.password = await bcrypt.hash(userData.password,10)

    let user_exists = await userExists(userData.email);
    if(user_exists.success === true){
        return new User("User already registered",{},false)
    }

    await knex.raw(`INSERT INTO users_data (email,password) VALUES (\'${userData.email}\',\'${userData.password}\');`)
        .catch((err) => {
            console.log(err)
        })

    let id = await knex.raw(`SELECT user_id,email FROM users_data WHERE email=\'${userData.email}\';`)
        .catch((err) => {
            console.log(err)
        })

    return new User("Successfully registered",{email:userData.email,id: id.rows[0].user_id},true)
}

const userExists = (email) => {
    return knex.raw(`SELECT user_id,email FROM users_data WHERE email=\'${email}\';`).then((data)=>{
        if(data.rowCount === 0)
            return new User("User not found", {},false )
        else
            return new User("User found", data.rows[0],true)

    }).catch((err)=>{
        console.log(err)
    })
}

//TODO: return jsons here
const loginUsers = (userData) =>{
    console.log("in-login")
    return knex.raw(`SELECT user_id,email,password FROM users_data WHERE email=\'${userData.email}\';`)
        .then(async (data) => {
            console.log("OdsaK")
            console.log(data.rows)
            if(data.rows.length === 0)
                return new User("User Doesnt Exists",{},false)
            let isEQ = await bcrypt.compare(userData.password,data.rows[0].password)
            if(isEQ){
                return new User("Ok",{email: data.rows[0].email,id :data.rows[0].user_id},true)
            }else{
                return new User("Not Ok",{},false)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
}

const setupPtoEntryOneUser = async (userData) =>{
    await knex.raw(`INSERT INTO users_ptos(
        \tuser_pto_start_days, user_remaining_pto_days, user_id)\n
        \tVALUES (21, 21, ${userData.id});`).catch((err)=>{
        console.log(err.message)
    })
    return new User("User registered and PTO table filled",{},true)
}

const dropOnePtoDay = async (userData) =>{
    const a = await knex.raw(`UPDATE users_ptos
	SET user_remaining_pto_days=user_remaining_pto_days -1
	WHERE user_id = ${userData.id};`).catch((err)=>{
        console.log(err.message)
    })

    return new User("User Dropped a Pto day",{},true)
}



const getPtoDaysRemaining = async (userData) => {
    const aux = await knex.raw(`SELECT user_remaining_pto_days FROM users_ptos WHERE user_id=\'${userData.id}\' ;`)
        .catch((err) => {
            console.log(err)
        })
    return new User("Remaining Pto Days .", aux.rows[0], true)
}

exports.registerUsers = registerUsers;
exports.loginUsers = loginUsers
exports.userExists = userExists
exports.setupPtoEntryOneUser = setupPtoEntryOneUser
exports.getPtoDaysRemaining = getPtoDaysRemaining
exports.dropOnePtoDay = dropOnePtoDay

