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

module.exports = knex;