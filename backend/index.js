const connectToMongo = require('./db');
const express = require('express') ; 
var cors = require('cors');
var app = express();

app.use(cors());


connectToMongo();
const port = 5000

// For JSON Return  
app.use(express.json());

//Available Routes
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// app.get('/', (req, res) => {
//   res.send('Hello There !')
// })
