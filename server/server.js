const express = require("express");
const app = express();
const mysql = require("mysql")
const cors = require('cors')

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "woahwoah19",
    database: "CRUD_shema",
})
// const db = mysql.createConnection({
//     user: "jaime",
//     host: "68.183.103.167",
//     password: "jaime123",
//     database: "jaime",
//     insecureAuth : true
// })
db.connect(err => {
    if(err){
      console.log("Connection:", err)
    } else {
        console.log("Connected to DB")
    }
})

const port = process.env.PORT || 3001

app.use(cors());
app.use(express.json()); // To parse Data from the body

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
          console.log(`Error from /create: ${err.message}`)
        }else {
          res.send("Values have been inserted");
        }
    })
})

app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if(err){
            console.log(`Error from GET: ${err}`)
        } else {
            res.send(result)
        }
    })
})

app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
  });