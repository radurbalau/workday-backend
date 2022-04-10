const express = require("express");
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api/users",require("./routes/api/users"))
app.use("/api/users/pto",require("./routes/api/ptos_days"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

