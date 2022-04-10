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

async function create_table() {
  knex
      .raw("CREATE TABLE users_data(" +
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

async function drop_table(name){
    knex
        .raw(`DROP TABLE users_data`)
        .then((data) => {
            console.log(data);
            console.log("OK")
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
test()


// console.log(exports.cryptPassword("asdfggfdsa12"))

// drop_table("users_data")
//create_table();
// test()