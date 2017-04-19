const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

//GET / – Главная страница которая вернет код 200 OK и покажет текст "Hello, Express.js"
app.get('/' , function (req, res) {
	res.status(200).send('Hello, Express.js');
});

//GET /hello – Страница, код ответа 200 OK и покажет текст "Hello stranger!"
app.get('/hello' , function (req, res) {
	res.status(200).send('Hello stranger!');
});

//GET /hello/[любое имя] – Страница, код ответа 200 OK и покажет текст "Hello, [любое имя]!"
app.get('/hello/:name', function (req, res) {
	res.status(200).send('Hello, '+ req.params.name + '!');
})

//ANY /sub/[что угодно]/[возможно даже так] – Любая из этих страниц должна показать текст "You requested URI: [полный URI запроса]"
app.all('/sub/*', function (req, res) {
	res.status(200).send('You requested URI: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
})

//Добавить в роут POST /post проверку на наличие Header: Key (на уровне middleware), если такого header не существует, то возвращать 401
const middleware = function (req, res, next) {
	if (!req.headers.key) {
		res.sendStatus(401);
	} else {
		next();
	}
}

//POST /post – Страница которая вернет все тело POST запроса (POST body) в JSON формате, либо 404 Not Found - если нет тела запроса
app.get('/post', middleware, function (req, res) {
	if (Object.keys(req.body).length !== 0){
		res.status(200).json(req.body);
	} else {
		res.sendStatus(404);
	}
})

app.listen(3000);
