import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import testRouter from './routers/testRouter'
import categoryRouter from './routers/category.router';
import mongoose from 'mongoose';
import subCategoryRouter from './routers/subCategory.router';
import itemRouter from './routers/item.router';

const server = express();

const PORT = 8000;

const init = () => {
    server.use(express.json());
    server.use(cors());
    
    server.use('/test', testRouter)
    server.use('/category', categoryRouter);
    server.use('/sub-category', subCategoryRouter);
    server.use('/item', itemRouter);

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })

};

const startServer = () => {
    mongoose.connect(process.env.MONGO_URL, {
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    }, async err => {
        if(err){
            console.log('Could not connect to DB');
            return
        }
        console.log('Connected to DB');
        init();
    })
};

startServer();