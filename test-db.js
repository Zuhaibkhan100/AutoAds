const mongoose = require('mongoose');
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const uri = "mongodb://seemaparveen600_db_user:WOPXE6SFULOvHN4Q@ac-14nws9z-shard-00-00.dvlu6rq.mongodb.net:27017,ac-14nws9z-shard-00-01.dvlu6rq.mongodb.net:27017,ac-14nws9z-shard-00-02.dvlu6rq.mongodb.net:27017/carads?ssl=true&replicaSet=atlas-jcbo5s-shard-0&authSource=admin&appName=AutoAds";

console.log("Connecting using Standard Connection String...");

mongoose.connect(uri)
    .then(() => {
        console.log("CRITICAL SUCCESS: Connected to MongoDB with Standard String!");
        process.exit(0);
    })
    .catch(err => {
        console.error("FAILURE:", err);
        process.exit(1);
    });
