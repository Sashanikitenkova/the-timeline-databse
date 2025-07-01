const express = require('express');
const routes = require('./config/routes');

require('./config/mongoose');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(routes);

app.listen(3000, () => console.log('Server is on 3000'));
