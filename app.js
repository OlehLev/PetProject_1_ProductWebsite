const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const { MONGO_CONNECT_URL, PORT } = require('./configs/config');

mongoose.connect(MONGO_CONNECT_URL,{ family: 4 });

app.use(express.json());

const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.router');

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(PORT, () =>{
    // eslint-disable-next-line no-console
    console.log(`App listen 5000 `);
});
