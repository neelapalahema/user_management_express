const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', { message: 'Welcome to User Management System!' });
});

const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
