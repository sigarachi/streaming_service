const express = require('express');
const config = require('config');
const cors = require('cors');
const bodyParser = require('body-parser')


const app = express()

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(express.json({extended: true}));
app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//routes
app.use("/", require('./src/routes/root.route'))
app.use("/api/auth", require('./src/routes/auth.route'))

const db = require('./src/models/')
db.sequelize.sync()

const PORT = config.get("port") || 5000;

async function start () {
    try{
        app.listen(PORT , () => {
            console.log(`Server started on port = ${PORT}`)
        })
    }catch (e) {
            console.log("Server error ", e.message);
            process.exit(1);
    }
}

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});


start();
