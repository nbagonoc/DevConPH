const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

// import middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(express.static("client/build"));

// import routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// DB config
const db = require("./config/db_secret").mongoURI;
// Passport config
require("./config/passport")(passport);

// connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log("we are connected"))
  .catch(err => console.log(err));

// use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// for production
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// heroku port || local port
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`we are live at port ${port}`));
