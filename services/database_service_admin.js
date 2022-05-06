const knex =  require('./google_cloud_connection/knex_service')
const bcrypt = require("bcrypt")
const ResponseModel = require("../models/UserAuthModel")

const loginAdmin = (adminData) =>{
    return knex.raw(`SELECT admin_id,email,password FROM admin_data WHERE email=\'${adminData.email}\';`)
        .then(async (data) => {
            if(data.rows.length === 0)
                return new ResponseModel("User Doesnt Exists",{},false)

            let isEQ = await bcrypt.compare(adminData.password,data.rows[0].password)
            if(isEQ){
                return new ResponseModel("Ok",{email: data.rows[0].email,id :data.rows[0].admin_id},true)
            }else{
                return new ResponseModel("Not Ok",{},false)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
}

const getAllNotApprovedPtos = async () => {
    const a = await knex.raw(`SELECT user_pto_dates_id, pto_date_taken, pto_reason, pto_comment, admin_approved, user_id
\tFROM public.users_ptos_dates_data WHERE admin_approved=FALSE;`).catch( (err)=> {console.log(err)})
    return new ResponseModel("All Non approved ptos", a.rows,true)
}

const approvePtoRequestByAdmin = async (ptoDay) =>{
    const a =  await knex.raw(`UPDATE public.users_ptos_dates_data
    \tSET admin_approved=TRUE
    \tWHERE user_pto_dates_id = ${ptoDay.user_pto_dates_id} ;`).catch( err=>{ console.log(err)})

    return new ResponseModel("All Non approved ptos", {},true)
}

const dropOnePtoDay = async (userData) =>{
    const a = await knex.raw(`UPDATE users_ptos
	SET user_remaining_pto_days=user_remaining_pto_days -1
	WHERE user_id = ${userData.id};`).catch((err)=>{
        console.log(err.message)
    })

    return new ResponseModel("User Dropped a Pto day",{},true)
}

const adminExists = (email) => {
    return knex.raw(`SELECT admin_id,email FROM admin_data WHERE email=\'${email}\';`).then((data)=>{
        if(data.rowCount === 0)
            return new ResponseModel("Admin not found", {},false )
        else
            return new ResponseModel("Admin found", data.rows[0],true)

    }).catch((err)=>{
        console.log(err)
    })
}

exports.adminExists = adminExists;
exports.loginAdmin = loginAdmin;
exports.getAllNotApprovedPtos = getAllNotApprovedPtos;
exports.approvePtoRequestByAdmin = approvePtoRequestByAdmin;
exports.dropOnePtoDay =dropOnePtoDay;

