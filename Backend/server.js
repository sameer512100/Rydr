const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');


const server =  http.createServer(app);

server.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
});