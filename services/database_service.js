const knex =  require('./knex_service')

const registerUsers = (userData) =>{
    console.log("in-register")
    knex.raw(`INSERT INTO users_data (email,password) VALUES (\'${userData.email}\',\'${userData.password}\');`)
        .then((data)=>{
            console.log("Register_OK")
        })
        .catch((err)=>{
            console.log(err)
        })
}

const loginUsers = (userData) =>{
    console.log("in-login")
    knex.raw(`SELECT email,password FROM users_data WHERE email=\'${userData.email}\' AND password=\'${userData.password}\' ;`)
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

