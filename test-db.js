require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const dns = require('node:dns');

// Force use of Google DNS to resolve MongoDB Atlas SRV records
dns.setServers(['8.8.8.8', '8.8.4.4']);

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error("FAILURE: MONGODB_URI is not defined in .env.local");
    process.exit(1);
}

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
