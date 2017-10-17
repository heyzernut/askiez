const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const path = require("path")
const app = express()
const User = require("./models/user")
const Thread = require("./models/thread")

//initialize mongoose and mongodb
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/askiez", {
  useMongoClient: true
})
mongoose.Promise = global.Promise

//middlewares
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

//express path for views
app.use(express.static(path.join(__dirname, "views")))

//page renders
//main page with questions
app.get("/", (req, res) => {
  Thread.find((err, data) => {
    if (err) console.log(err)
    res.render("index", { title: "Askiez", threads: data })
  })
})

app.get("/thread/:id", (req, res) => {
  //get array index from url parameter
  let threadIndex = req.params.id
  //render page with data of the specified thread
  Thread.findById(threadIndex, (err, data) => {
    // console.log(data)
    res.render("showThread", {
      title: "thread",
      currentThread: data
    })
  })
})

app.post("/thread/:idx", (req, res) => {
  //get context
  Thread.findById(req.body.id, (err, data) => {
    data.answers.push({ content: req.body.content })
    data.save().then(() => {
      // res.redirect(`/thread/${req.params.idx}`)
      Thread.findById(req.body.id, (err, data) => {
        // console.log(data)
        res.render("showThread", {
          title: "thread",
          currentThread: data
        })
      })
    })
  })
})

// login page
app.get("/login", (req, res) => {
  res.render("login", { title: "Login" })
})

app.post("/login", (req, res) => {
  let newUser = new User(req.body)
  newUser.save(err => {
    if (err) console.log(err)
    return
  })
  // console.log("user added")
})

//submit a question page
app.get("/thread", (req, res) => {
  res.render("thread", { title: "Submit a Thread" })
})

app.post("/thread", (req, res) => {
  let newThread = new Thread(req.body)
  newThread.save(err => {
    if (err) console.log(err)
    return
  })
  // console.log(newThread)
})

//listening port
app.listen(3000, () => {
  console.log(`server is running on port 3000`)
})
