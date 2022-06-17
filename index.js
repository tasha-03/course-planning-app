require("dotenv").config();
const express = require("express");
const db = require("./src/models");
const PORT = process.env.PORT;
const router = require("./src/routes/index");

const app = express();

app.use(express.json());
app.use("/", router);

db.sequelize.sync();

app.listen(PORT, (err) => {
  if (!err) console.log(`App listening on port ${PORT}`);
  else console.log(`Error occured: ${err}`);
});
