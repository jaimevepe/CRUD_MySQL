const express = require("express");
const app = express();
const mysql = require("mysql")

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "CRUD_schema"
})

const port = process.env.PORT || 3001

app.use(express.json()) // To parse Data

// app.post will create and send the data to the DataBase
app.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    //the 5 ? represent the variables that we will send like name, age, ect
    db.query('INSERT INTO employees(name, age, country, position, wage) VALUES (?,?,?,?,?)',
    [name, age, country, position, wage], 
    (err, result) => {
        if(err){
          console.log(`Error from /create: ${err}`)
        }else {
          res.send("Values have been inserted");
        }
    })

})


app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
  });