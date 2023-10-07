const express = require("express");
const app = express();
const port = 3030; //port yang digunakan untuk API bisa diganti sesuai kebutuhan

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.json({ message: "API Node JS" });
});

const appRoute = require('./config/routes');
app.use('/', appRoute);