const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/route');

const port = 5000;

//use middlewares
app.use(cors());
app.use(express.json());

// using routes
app.use(require('./routes/route'))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})