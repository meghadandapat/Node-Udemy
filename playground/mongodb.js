// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId;

const { ObjectID } = require("bson");
const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectID()
// console.log(id)

MongoClient.connect(
  connectionURL,
  {
    useNewUrlParser: true,
  },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }
    const db = client.db(databaseName);

    /********Inseting docs*********/

    // db.collection("users").insertOne({
    //   name: "Devika",
    //   age: 20,
    // });

    // db.collection("users").insertOne(
    //   {
    //     name: "Aabha",
    //     age: 22,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("unable to insert");
    //     }
    //     console.log(result); //result obj as two properties: acknowledged and isertedId
    //   }
    // );

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Disha",
    //       age: 18,
    //     },
    //     {
    //       name: "Jenny",
    //       age: 25,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("unable to insert");
    //     }
    //     console.log(result); //result obj as three properties: acknowledged, insertedCount and isertedIds(array of Ids)
    //   }
    // );

    //***********Reading docs************/

    //if there are multiple only the first query will be retuned by findone
    //if query is not found then it will throw error but give null
    db.collection("users").findOne(
      {
        name: "Devika",
      },
      (error, user) => {
        if (error) {
          return console.log("Unable to fetch");
        }
        console.log(user);
      }
    );

    db.collection("users").findOne(
      {
        _id: new ObjectID("61a5edf3ceaf9ebc4d6d52d1"),
      },
      (error, user) => {
        if (error) {
          return console.log("Unable to fetch");
        }
        console.log(user);
      }
    );

    //does not take callback as a parameter
    //returns a pointer to the first matching doc
    db.collection("users")
      .find({
        name: "Megha",
      })
      .toArray((error, result) => {
        console.log(result);
      });

    db.collection("tasks")
      .find({
        complete: "false",
      })
      .count((error, result) => {
        console.log(result);
      });

    //****update docs*****//
    //$set,$inc are update operators
    //using promises with update instead of callbacks(is callback is not passed as third para by default a promise is returned)

    db.collection("users")
      .updateOne(
        {
          _id: new ObjectID("61bb5b33f47b6ac3e43289d9"),
        },
        {
          $set: {
            name: "Mike",
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    db.collection("tasks")
      .updateMany(
        {
          complete: "false",
        },
        {
          $set: {
            complete: "true",
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    //**********Delete docs*********//
    db.collection("users")
      .deleteMany({
        name: "Megha",
      })
      .then((result) => console.log(result))
      .catch((error) => {
        console.log(error);
      });

    db.collection("tasks")
      .deleteOne({
        _id: new ObjectID("61a5a61e552ae628f3024526"),
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
