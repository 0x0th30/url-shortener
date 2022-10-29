import express from 'express';

const port = process.env.PORT || 3000;
const server = express();

server.use(express.json());

server.listen(port);
