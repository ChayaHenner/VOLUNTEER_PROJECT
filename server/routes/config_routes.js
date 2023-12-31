const indexR = require("./index");
const usersR = require("./users");
const missionsR = require("./missions")
const postsR = require("./posts")
const reviewsR = require("./reviews")
const forgetPassR = require("./forgotPass")
const resetPassR = require("./resetPass")
const reportR = require("./report")



exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/missions",missionsR);
  app.use("/posts",postsR);
  app.use("/reviews",reviewsR);
  app.use("/forgot-password",forgetPassR);
  app.use("/reset-password",resetPassR);
  app.use("/report",reportR);

}