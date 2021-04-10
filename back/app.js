const express = require('express');
require('dotenv').config();
const route = require('./API/index')

async function startServer() {
    const app = express();

    await require('./Loaders/index').default({ app });

    app.listen(process.env.PORT, err => {
        if (err){
            console.log(err);
            return process.exit(1);
        }
        console.log("Server started on port: " + process.env.PORT + "!");
    });
}

startServer();