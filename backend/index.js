const express = require('express');

const app = express();

app.get("/", (req,resp) => {
    resp.send('App Is Working Now...');
});

app.listen(8000);