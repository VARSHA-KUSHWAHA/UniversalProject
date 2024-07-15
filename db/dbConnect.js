
const { MongoClient } = require("mongodb");

const url = process.env.MONGODB_URL;


async function dbConnect() {
  const connect = await MongoClient.connect(url);
  const db = connect.db("Learning");
  const collection = db.collection("Users");
  console.log("Connected to the database and collection: ", collection);
  return collection;
}

module.exports=dbConnect;