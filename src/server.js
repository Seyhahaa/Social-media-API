const express = require('express')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const app = express()
const authRoute = require('./routes/authRoute');
const FriendRoute = require('./routes/friendRoute');
const postRoute = require('./routes/postRoute');



dotenv.config();



require("./db");
// import middleware
const authMiddleware = require("./middleware/authMiddleware");

// middllware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../upload')))

//route
app.use('/auth', authRoute)
app.use('/friend', authMiddleware, FriendRoute)
app.use('/post', authMiddleware, postRoute)


app.listen(process.env.PORT, ()=>{
    console.log('Server is running on port ' + process.env.PORT)
})



