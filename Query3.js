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
                tweet_count: { $sum: 1 }
                }
            },
            { $sort: { tweet_count: -1 } },
            {
                $project: {
                _id: 0,
                screen_name: 1,
                tweet_count: 1
                }
            },
            { $limit: 1 }
            ],
            { maxTimeMS: 60000, allowDiskUse: true }
        ).toArray();
        console.log(results);
    
    } finally {
        await client.close();
    }
}

run().catch(console.dir);