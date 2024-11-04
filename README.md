# MongoDB_Queries
Submission by Vinal Dalcy Dsouza
Includes Mongo + Node.js

# How to load data
* Download the tweets generated during the 2020 ieeevis Conference  https://johnguerra.co/viz/influentials/ieeevis2020/ieeevis2020Tweets.dump.bz2 Links to an external site..

* Unzip the file. You can unzip this file using Keka Links to an external site. or 7zip Links to an external site. If on mac, double click on the zipped file. 

* After extraction you should have a .dump

* Import the file using mongoimport. If you already have port 27017 used, use 37017
```mongoimport -h localhost:27017 -d ieeevisTweets -c tweet --file ieeevis2020Tweets.dump```

# Queries
* Query1: How many tweets are not retweets or replies? (hint the field retweeted_status contains an object when the tweet is a retweeet)

Run the Query1.js on vscode
```node Query1.js```

* Query2: Return the top 10 screen_names by their number of followers.
Run the Query2.js on vscode
```node Query2.js```

* Query3: Who is the person that got the most tweets?
Run the Query3.js on vscode
```node Query3.js```

* Query4: Who are the top 10 people that got more retweets in average, after tweeting more than 3 times
Run the Query4.js on vscode
```node Query4.js```

* Query4: Write the instructions that will separate the Users information into a different collection

Instructions are found in Q5_Instructions.txt and also the comments

Create a user collection that contains all the unique users.
Create a new Tweets_Only collection, that doesn't embed the user information, but instead references it using the user id

Run Query5.js on vscode using
```nnode Query5.js```