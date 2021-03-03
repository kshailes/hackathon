const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const herokuMongodbUri = process.env.MONGODB_URI
const connectionUrl = "mongodb://127.0.0.1:27017" || herokuMongodbUri
const databaseName = "hack-db"
const MerchantCollection = "merchant"

const callback = function (error, result, errorMessage) {
    if (error) {
        return console.log(errorMessage)
    }
    console.log(result.ops)
}

const query = function (category, resultCallback) {
    MongoClient.connect(connectionUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
        if (error) {
            return console.log("mongodb not connected!!")
        }
        console.log("mongodb connected correctly!")

        const db = client.db(databaseName)

        // db.collection(MerchantCollection).insertOne({
        //     name : "Mac Donald's",
        //     imageUrl: "imageurl",
        //     category:"food",
        //     offers: ["10%off", "20%off"]
        // })
        // db.collection(MerchantCollection).insertMany([{
        //     name : "Dominos",
        //     imageUrl: "imageurl",
        //     category:"food",
        //     offers: ["30%off", "20%off"]
        // },
        //     {
        //         name : "Bata",
        //         imageUrl: "imageurl",
        //         category:"shopping",
        //         offers: ["10%off"]
        //     }],
        //     (error, result) =>{ callback(error,result, "not inserted")}
        //     )

        db.collection(MerchantCollection).find({category: category}).toArray((error, merchants) => {
            if (error) {
                return console.log("finding docs failed")
            }
            console.log(merchants)
            resultCallback(merchants)
            // return merchants
        })
    })
}

module.exports = {query}