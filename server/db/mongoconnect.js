const mongoose = require('mongoose');
const {config} = require("../config/secret")

main().catch(err => console.log(err));

async function main() {
    mongoose.set('strictQuery' , false);
  await mongoose.connect('mongodb://127.0.0.1:27017/project');
  // await mongoose.connect(`mongodb+srv://${config.userDb}:${config.passDb}@clusterchaya.zoha4yp.mongodb.net/PROJECT`);

  console.log("mongo connect")
}

