import { MongoClient } from "mongodb";

//Connection URL
const uri = "mongodb://localhost:27017" || process.env.MONGO_URI;
const client = new MongoClient(uri);

// Database and collection names
const dbName = 'ieeevisTweets';
const tweetCollectionName = 'tweet';
const userCollectionName = 'users';
const tweetsOnlyCollectionName = 'tweets_Only';

async function run() {
    try {
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const tweetCollection = db.collection(tweetCollectionName);
        const userCollection = db.collection(userCollectionName);
        const tweetsOnlyCollection = db.collection(tweetsOnlyCollectionName);

        // Create a set to store unique user IDs
        const userIds = new Set();

        // Iterate through each document in the tweet collection
        const tweets = await tweetCollection.find().toArray();
        for (const tweet of tweets) {
            const user = tweet.user;

            if (user && !userIds.has(user.id)) {
                userIds.add(user.id);
                await userCollection.insertOne(user);
            }

            // Simplified way to insert tweet without user information
            tweet.userId = user.id;
            delete tweet.user;
            await tweetsOnlyCollection.insertOne(tweet);
        }

        console.log('Users and Tweets_Only collections created successfully');

    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);