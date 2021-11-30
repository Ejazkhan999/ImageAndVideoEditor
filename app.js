const port = 3001;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const models = require('./models')
const Routes = require('./routes');

// const fileUpload = require('express-fileupload');
app.use(cors({origin: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'))

app.use('/', Routes);

models.sequelize.sync({ force : false }).then(() => {
    app.listen(port, () => console.log(`database listening to port ${port}`))
}).catch(err => console.log(err));