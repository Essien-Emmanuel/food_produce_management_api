require('dotenv').config();
const app = require('./app');
const port = 3303;

app.listen(port, () => {
    console.log(`server is spinning at port ${port}`)
})