const path = require('path');
const express = require('express');
const app = express();
// const url = '192.168.43.44';
var staticPath = path.join(__dirname + '/../dist');
console.log(staticPath)
app.use(express.static(staticPath));
app.listen(80,()=>{
    console.log('running....');
});

