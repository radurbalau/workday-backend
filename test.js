const {Knex} = require("knex");
var bcrypt = require('bcrypt');

//TODO: ENCRYPTION
const password = 'pass123';
var hashedPassword;

// Encryption of the string password
bcrypt.genSalt(10, function (err, Salt) {

    // The bcrypt is used for encrypting password.
    bcrypt.hash(password, Salt, function (err, hash) {

        if (err) {
            return console.log('Cannot encrypt');
        }

        hashedPassword = hash;
        console.log(hash);

        bcrypt.compare(password, hashedPassword,
            async function (err, isMatch) {

                // Comparing the original password to
                // encrypted password
                if (isMatch) {
                    console.log('Encrypted password is: ', password);
                    console.log('Decrypted password is: ', hashedPassword);
                }

                if (!isMatch) {

                    // If password doesn't match the following
                    // message will be sent
                    console.log(hashedPassword + ' is not encryption of '
                        + password);
                }
            })
    })
})

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





// console.log(exports.cryptPassword("asdfggfdsa12"))

// drop_table("users_data")
//create_table();
// test()