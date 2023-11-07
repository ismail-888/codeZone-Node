// Mongo Only Without mongoose

const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://code-zone:YudCCRCClVJecPlw@cluster0.ixdxtiz.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);

const main = async () => {
    // connection to database
  await client.connect();
  console.log("connected successfully to server");

  // choose database to interact with
  const db = client.db("codeZone");

// choose collection to interat with
  const collection = db.collection("courses");

  await collection.insertOne({
    title:"new course",
    price:5000
  })

  //get Query
  // Get All Courses
  const data = await collection.find().toArray()
  console.log("data", data);
};

main();
