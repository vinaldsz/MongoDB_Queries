import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017" || process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
    try {
    const db = client.db("ieeevisTweets");
    const tweetCollection = db.collection("tweet");

    const results = await tweetCollection.aggregate([
        {
          $sort: { "user.followers_count": -1 }
        },
        {
          $limit: 10
        },
        {
          $project: {
            _id: 0,
            screen_name: "$user.screen_name",
            followers_count: "$user.followers_count"
          }
        }
      ]).toArray();

    console.log(results);
    
    } finally {
        await client.close();
    }
}

run().catch(console.dir);