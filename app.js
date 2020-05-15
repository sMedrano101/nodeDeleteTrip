//REQUIRED///////////////
const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const session = require("express-session");

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

//loads
app.use(express.urlencoded());

// app.use(    USER
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

///////////////////////

tasks = [];

//created GET  (search bar)
app.get("/trips", (req, res) => {
  res.render("trips", { listOfTask: tasks });
});

app.post("/tripsDelete", (req, res) => {
  let deletedPost = req.body.delete;

  let newArrayDeletedPost = tasks.filter((post) => {
    return post.destination != deletedPost;
  });

  tasks = newArrayDeletedPost;
  console.log(tasks);
  res.redirect("/trips");
});

app.post("/trips", (req, res) => {
  let destination = req.body.destination;
  let image = req.body.image;
  let arrival = req.body.arrival;
  let departure = req.body.departure;

  let task = {
    destination: destination,
    image: image,
    arrival: arrival,
    departure: departure,
  }; //created task for array to pull
  tasks.push(task);

  // res.render("trips", {
  //   destination: destination,
  //   image: image,
  //   arrival: arrival,
  //   departure: departure,
  // });
  res.redirect("/trips");
});

//REQUIRED///////
app.listen(3000, () => {
  console.log("server is running");
});
