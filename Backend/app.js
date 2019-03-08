const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const user = require('./routes/user');

const app = express();


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());


app.use('/', user);

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server Started at Port: ${PORT}`);
});
