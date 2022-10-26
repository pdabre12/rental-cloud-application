const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://admin:vx5n-FR7AcKdf4w@cmpe281.4rh64.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('cmpe281');
    const testingData = database.collection("test1");
    // create a document to insert
    const doc = {
      title: "Record of a tesing data",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    }
    const result = await testingData.insertOne(doc);
    console.log("MongoDB Connected!");
    console.log(`A document was inserted with the id: ${result.insertedId}`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



// for Python
// import pymongo
// import json
// from pymongo import MongoClient, InsertOne

// uri = "mongodb+srv://admin:vx5n-FR7AcKdf4w@cmpe281.4rh64.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// client = pymongo.MongoClient(url)
// db = client.cmpe281
// collection = db.<COLLECTION>
// requesting = []

// with open(r"<FILENAME>") as f:
//     for jsonObj in f:
//         myDict = json.loads(jsonObj)
//         requesting.append(InsertOne(myDict))

// result = collection.bulk_write(requesting)
// client.close()