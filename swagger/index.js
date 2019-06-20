const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const bodyParser = require('body-parser');

const swaggerFile = require('./swagger.json');
const app = express();

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const PORT = 3001;

const options = {
	explorer: true,
	enableCORS: false
};

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile, options));

app.listen(PORT, () =>
	console.log(`swagger ui listening on port ${PORT}!`),
);