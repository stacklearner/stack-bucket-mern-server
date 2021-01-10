require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const { useMorgan } = require('./middlewares');
const { logger } = require('./util');

const app = express();
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		logger.info('Database Connected');
	})
	.catch((e) => {
		console.log(e);
		logger.error(e.message);
	});

useMorgan(app);
app.use(cors());
app.use(express.static(path.join(__dirname, '../', 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
	res.status(200).json({
		msg: 'Hello World',
	});
});

app.listen(process.env.PORT, () => {
	logger.info(`Server listening on port ${process.env.PORT}`);
});
