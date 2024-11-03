import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017" || process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        const db = client.db("ieeevisTweets");
        const tweetCollection = db.collection("tweet");

        const results = await tweetCollection.aggregate(
        [
        {
            $group: {
            _id: '$user.id',
            screen_name: {
                $first: '$user.screen_name'
            },
            tweet_count: { $sum: 1 },
            avg_retweets: { $avg: '$retweet_count' }
            }
        },
        { $match: { tweet_count: { $gt: 3 } } },
        { $sort: { avg_retweets: -1 } },
        { $limit: 10 }
        ],
        { maxTimeMS: 60000, allowDiskUse: true }
    ).toArray();
    
    console.log(results);
    
    } finally {
        await client.close();
    }
}

run().catch(console.dir);