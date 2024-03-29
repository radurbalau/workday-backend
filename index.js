const express = require("express");
const passport = require("passport");
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api/users",require("./routes/api/users"))
app.use("/api/users/pto",require("./routes/api/ptos_days"))
app.use("/api/admin",require("./routes/api/admin_routes"))

// app.use(passport.initialize())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

