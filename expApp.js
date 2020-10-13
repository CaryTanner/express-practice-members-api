const { urlencoded } = require("body-parser");
const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars')
const logger = require('./middleware/Logger')
const members = require('./Members')

const app = express();
const PORT = process.env.PORT || 5000;


//___ Init logger middleware___
//app.use(logger);

//handlebars middleware

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index', {
        title: "Member List",
        members,
    })
})

//________ Static files________

app.use(express.static(path.join(__dirname, "public")));

// app.get('/', (req, res)=>{
//     res.sendFile(path.join(__dirname,  'index.html'))
// })
// app.get('/about', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'about.html'))
// })
// app.get('/contact', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'contact-me.html'))
// })

//body parser middleware
app.use(express.json());
app.use(urlencoded({extended: false}))

// api members
app.use('/api/members', require('./routes/api/members'))

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
