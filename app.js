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

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

///////////////////////
users = [];
tasks = [];

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let user = users.find(
    (u) => u.username == username && u.password == password
  );

  if (user) {
    //created a session
    if (req.session) {
      //put usersname into session
      req.session.username = user.username;
      res.redirect("/trips");
    } else {
      res.redirect("/login");
    }
  } else {
    res.render("login", { message: "Username or password is incorrect" });
  }
});

//creating for register page
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let user = { username: username, password: password };

  //check if user name is avaible
  let alreadyAUser = users.find((u) => u.username == user.username);

  if (alreadyAUser) {
    //username has already been registered
    res.render("register", { message: "sorry Username not available" });
  } else {
    // the else is being used to redirect those not directed.
    users.push(user);
    res.redirect("/login");
  }
});

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
