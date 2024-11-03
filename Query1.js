import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017" || process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
    try {
    const db = client.db("ieeevisTweets");
    const tweetCollection = db.collection("tweet");

    const query = {
        retweeted_status: { $exists: false },
        in_reply_to_status_id: null
      };
    const tweets = await tweetCollection.countDocuments(query);

    console.log("tweets counts are here", tweets);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);