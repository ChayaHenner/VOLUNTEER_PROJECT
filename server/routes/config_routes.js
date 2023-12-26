const indexR = require("./index");
const usersR = require("./users");
const missionsR = require("./missions")
const reviewsR = require("./reviews")

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/missions", missionsR);
  app.use("/reviews", reviewsR);
}