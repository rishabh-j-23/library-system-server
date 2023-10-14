import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';

import bookRouter from './routes/bookRouter';
import readerRouter from './routes/readerRouter';
import staffRouter from './routes/staffRouter';
import borrowRouter from './routes/borrowRouter';

const app = express();

app.use(cors({
    credentials: true
}));
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: false
}));

// routes

app.use('/api', bookRouter);
app.use('/api', readerRouter);
app.use('/api', staffRouter);
app.use('/api', borrowRouter);

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
})

app.get('/', (req, res) => {
    res.send('Express server for Library Management System');
});

