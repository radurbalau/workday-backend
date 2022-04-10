const createUnixSocketPool = async () => {
  const dbSocketPath = 5432 || "/cloudsql";

  // Establish a connection to the database
  return Knex({
    client: "pg",
    connection: {
      user: "postgres", // e.g. 'my-user'
      password: "test", // e.g. 'my-user-password'
      database: "postgres", // e.g. 'my-database'
      host: `/cloudsql/nomad-301513:europe-west3:test`,
    },
    // ... Specify additional properties here.
    ...config,
  });
};

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

async function test() {
  knex
    .raw("SELECT * FROM test")
    .then((data) => {
      console.log(data.rows);
    })
    .catch((err) => {
      console.log(err);
    });
}

test();
