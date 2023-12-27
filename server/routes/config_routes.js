const indexR = require("./index");
const usersR = require("./users");
const missionsR = require("./missions")
const postsR = require("./posts")
const reviewsR = require("./reviews")



exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/missions",missionsR);
  app.use("/posts",postsR);
  app.use("/reviews",reviewsR);

}