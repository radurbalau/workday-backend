const knex =  require('./knex_service')
const bcrypt = require("bcrypt")


const registerUsers = async (userData) => {
    console.log("in-register")
    userData.password = await bcrypt.hash(userData.password,10)
    console.log(userData)
    knex.raw(`INSERT INTO users_data (email,password) VALUES (\'${userData.email}\',\'${userData.password}\');`)
        .then((data) => {
            console.log("Register_OK")
        })
        .catch((err) => {
            console.log(err)
        })
}

const loginUsers = (userData) =>{
    console.log("in-login")
    return knex.raw(`SELECT email,password FROM users_data WHERE email=\'${userData.email}\';`)
        .then(async (data) => {
            console.log("OK")
            console.log(data.rows)
            let isEQ = await bcrypt.compare(userData.password,data.rows[0].password)
            if(isEQ){
                return "Ok"
            }else{
                return "not Ok"
            }
        })
        .catch((err)=>{
            console.log(err)
        })
}

const getPtoDaysRemaining = (userData) =>{
    console.log("in-login")
    knex.raw(`SELECT email, FROM users_data WHERE email=\'${userData.email}\' AND password=\'${userData.password}\' ;`)
        .then((data)=>{
            console.log("OK")
            console.log(data.rows)
        })
        .catch((err)=>{
            console.log(err)
            console.log("dasda")
        })
}

exports.registerUsers = registerUsers;
exports.loginUsers = loginUsers

