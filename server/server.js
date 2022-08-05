const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '895b388e5d1b4405b4954a20659e0e3b',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

// Serving files using middleware (express.static)
// app.use('/', express.static(path.join(__dirname, '../public')));

// Serving files using endpoints (app.get())
app.get('/', function(req, res) {
    rollbar.info("We finally did it")
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 4005;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});