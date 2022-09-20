import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';
import asyncHandler from 'express-async-handler';

const PORT = process.env.PORT
const app = express();

app.use(express.static('public'));
// Note: Don't add or change anything above this line.

/* Add your code below this line. It will:
   Define variables for the middleware counting.
   Count the calls.
   Get the random person data.
   Respond using an error handler middleware function when it doesn't work.
*/
const printInterval = 10;
let counter = 0;

app.use('/random-person', (req, res, next) => {
    counter += 1;

    if (counter % printInterval == 0) {
        console.log(`
        You've got ${counter} random people so far! >.<
        `);
    }
    next();
});

app.get('/random-person', asyncHandler(async (req, res)=> {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    res.send(data);
    res.status(200);
}));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.send('500 - Server Error'); //<- simpler form
  
});

// Note: Don't add or change anything below this line.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});