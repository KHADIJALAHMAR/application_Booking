const express = require('express');
const app =express();
const path = require('path');














const Port = process.env. Port || 3000;
app.listen(Port ,() => console.log (`app runnig on ${Port} port`));