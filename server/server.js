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
// When using endpoints, you need to specify the name of the file
app.get('/', function(req, res) {
    rollbar.info('We finally did it')
    rollbar.error('Some terrible error')
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/yo', (req, res) => {
    rollbar.info(`We have received ${req.body.text}`);
    res.sendStatus(200);
});

const port = process.env.PORT || 4005;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});