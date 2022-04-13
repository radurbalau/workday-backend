const {Knex} = require("knex");
var bcrypt = require('bcrypt');

//TODO: ENCRYPTION
const password = 'pass123';
var hashedPassword;

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "34.159.19.143",
    port: 5432,
    user: "postgres",
    password: "test",
    database: "postgres",
  },
});

// console.log(knex);

// knex("test")
//   .select()
//   .then((data) => {
//     console.log(data);
//     console.log(data[0].firstname);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

async function create_table_users() {
  knex
      .raw("CREATE TABLE users_data(" +
          "user_id SERIAL PRIMARY KEY,\n" +
          "email varchar(255),\n" +
          "password varchar(255)\n" +
          "); ")
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
}
async function create_table_user_ptos() {
    knex
        .raw("CREATE TABLE users_ptos(" +
            "user_pto_id SERIAL PRIMARY KEY,\n" +
            "user_pto_start_days integer,\n" +
            "user_remaining_pto_days integer,\n" +
            "FOREIGN KEY (uid) REFERENCES uProfiles (uid)\n" +
            "); ")
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
}
// drop_table("a").then(r => console.log(r));

//create_table_users()
create_table_user_ptos()

async function drop_table(name){
    knex
        .raw("DROP TABLE users_data;")
        .then((data) => {
            console.log(data);
            console.log("OK");
        })
        .catch((err) => {
            console.log(err);
        });
}



// async function test1() {
//   knex
//       .raw("INSERT INTO users_data(\"firstname\",\"lastname\") VALUES ("Radu","Durbalau");")
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
// }

async function test() {
  knex
    .raw("SELECT * FROM users_data")
    .then((data) => {
      console.log(data.rows);
    })
    .catch((err) => {
      console.log(err);
    });
}

//create_table()
//test()


// console.log(exports.cryptPassword("asdfggfdsa12"))

// drop_table("users_data")
//create_table();
// test()