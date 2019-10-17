import express from "express";
import path from 'path';
const mongoose = require('mongoose');

const server = express();
const webpack = require('webpack');
const config = require('./../../config/webpack.dev');
const compler = webpack(config);

const morgan = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
var cors = require('cors')


const fileRoutes = require("./../router/api/uploadFile");
const employeeRouter = require('./../router/api/employeeHandler');
const buildingRouter = require('./../router/api/buildingHandler');
const flatRouter = require('./../router/api/flatHandler');
const userRouter = require('./../router/api/userHandler');
const notificationRouter = require('./../router/api/notificationHandler');
const rolesRouter = require('./../router/api/rolesHandler');
const socket = require('./../router/api/socketHandler');


server.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
server.use(bodyParser.json())
// Use http logger middleware
server.use(morgan('dev'));

// Set static folder
server.use('/public', express.static(path.resolve(__dirname, 'public')));

// Passport middleware
server.use(passport.initialize());

// Passport Config
require('./../middleware/passport')(passport);
server.use(cors())

server.use(cors())
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT POST PATCH GET DELETE');
        return res.status(200).json({});
    }
    next();
});

const webpackDevMiddleware = require('webpack-dev-middleware')(
    compler,
    config.devServer
)

const webpackHotMiddleware = require('webpack-hot-middleware')(compler);

server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);
const staticMiddleware = express.static("dist");

server.use(staticMiddleware);

server.use("/api/v1/", fileRoutes);
server.use('/api/employee', employeeRouter);
server.use('/api/building', buildingRouter);
server.use('/api/flat', flatRouter);
server.use('/api/user', userRouter);
server.use('/api/notification', notificationRouter);
server.use('/api/roles', rolesRouter);

mongoose.connect(`mongodb://localhost/express-qlcc-version2`)
    .then(res => console.log('Connected MongoDB'))
    .catch(err => console.log(err));
const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log("Server listenning");
})