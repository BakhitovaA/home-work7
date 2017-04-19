const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

//GET / � ������� �������� ������� ������ ��� 200 OK � ������� ����� "Hello, Express.js"
app.get('/' , function (req, res) {
	res.status(200).send('Hello, Express.js');
});

//GET /hello � ��������, ��� ������ 200 OK � ������� ����� "Hello stranger!"
app.get('/hello' , function (req, res) {
	res.status(200).send('Hello stranger!');
});

//GET /hello/[����� ���] � ��������, ��� ������ 200 OK � ������� ����� "Hello, [����� ���]!"
app.get('/hello/:name', function (req, res) {
	res.status(200).send('Hello, '+req.params.name+'!');
})

//ANY /sub/[��� ������]/[�������� ���� ���] � ����� �� ���� ������� ������ �������� ����� "You requested URI: [������ URI �������]"
app.all('/sub/*', function (req, res) {
	let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	res.status(200).send('You requested URI: ' + fullUrl);
})

//�������� � ���� POST /post �������� �� ������� Header: Key (�� ������ middleware), ���� ������ header �� ����������, �� ���������� 401
const middleware = function (req, res, next) {
	if (!req.headers.key) {
		res.sendStatus(401);
	} else {
		next();
	}
}


//POST /post � �������� ������� ������ ��� ���� POST ������� (POST body) � JSON �������, ���� 404 Not Found - ���� ��� ���� �������
app.get('/post', middleware, function (req, res) {
	if (Object.keys(req.body).length !== 0){
		res.status(200).json(req.body);
	} else {
		res.sendStatus(404);
	}
})

app.listen(3000);