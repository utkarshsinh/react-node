// backend/index.js

require("dotenv").config();
require("./database/database.js").connect();
const auth = require("./middleware/auth");

const router = require("./routes/index");
const express = require("express");
const bodyParser = require("body-parser");


const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('./uploads'));

app.post("/api/hello", auth, (req, res) => {
  res.status(200).send("Hello 🙌 ");
});

app.get("/", (req, res) => {
  res.send({ message: "Hello, nodemon!" });
});


app.use("/api", router);


app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});