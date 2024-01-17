

const mongoose = require('mongoose');
const { config } = require("../config/secret")

main().catch(err => console.log(err));

async function main() {
  mongoose.set('strictQuery', false);

  await mongoose.connect(`mongodb+srv://${config.userDb}:${config.passDb}@clusterchaya.zoha4yp.mongodb.net/volunteer111`);
 
  console.log("mongo connect")
}
