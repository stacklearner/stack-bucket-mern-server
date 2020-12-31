const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose
	.connect('mongodb://localhost:27017/stack-bucket-mern', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Data Connected');
	})
	.catch((e) => {
		console.log(e);
	});

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../', 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
	res.status(200).json({
		msg: 'Hello World',
	});
});

app.listen(8080, () => {
	console.log('Server listening on port 8080');
});
