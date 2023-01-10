const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const app = express()


//settings
app.set('port',3000);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'pages')))

//midleware

app.use(require('./routes/routes'));



app.listen(app.get('port'))