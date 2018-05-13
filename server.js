const express = require('express')
const mongoose = require('mongoose')

const app = express()

// import routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// DB config
const db = require('./config/database').mongoURI;
// connect to mongoDB
mongoose.connect(db)
    .then(()=>console.log('we are connected'))
    .catch(err=>console.log(err))

app.get('/', (req,res) => res.send('hello'))

// use routes
app.use('/api/users',users)
app.use('/api/profile',profile)
app.use('/api/posts',posts)
// heroku || local
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`we are live at port ${port}`));