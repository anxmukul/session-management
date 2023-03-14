const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

const app = express();
const PORT = 3000;

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//username and password
const myusername = 'mukul'
const mypassword = 'mypassword'

//username and password
const myusername1 = 'abhi'
const mypassword1 = 'abhi'
// a variable to save a session
var session;

// a variable to save a session
var session;

//session middleware
app.use(
  sessions({
    secret: process.env.secret, 
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

// cookie parser middleware
app.use(cookieParser());


app.get("/", (req, res) => {
  session = req.session;
  if (session.userid) {
    res.send("Welcome User <a href='/logout'>click to logout</a>");
  } else res.sendFile("views/index.html", { root: __dirname });
});

app.post('/user',(req,res) => {
    if((req.body.username == myusername && req.body.password == mypassword) || (req.body.username == myusername1 && req.body.password == mypassword1) ){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`Hey ${session.userid}, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
})

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
