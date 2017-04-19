const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

//GET / – Ãëàâíàÿ ñòðàíèöà êîòîðàÿ âåðíåò êîä 200 OK è ïîêàæåò òåêñò "Hello, Express.js" 
app.get('/' , function (req, res) {
	res.status(200).send('Hello, Express.js');
});

//GET /hello – Ñòðàíèöà, êîä îòâåòà 200 OK è ïîêàæåò òåêñò "Hello stranger!"
app.get('/hello' , function (req, res) {
	res.status(200).send('Hello stranger!');
});

//GET /hello/[ëþáîå èìÿ] – Ñòðàíèöà, êîä îòâåòà 200 OK è ïîêàæåò òåêñò "Hello, [ëþáîå èìÿ]!"
app.get('/hello/:name', function (req, res) {
	res.status(200).send('Hello, '+req.params.name+'!');
})

//ANY /sub/[÷òî óãîäíî]/[âîçìîæíî äàæå òàê] – Ëþáàÿ èç ýòèõ ñòðàíèö äîëæíà ïîêàçàòü òåêñò "You requested URI: [ïîëíûé URI çàïðîñà]"
app.all('/sub/*', function (req, res) {
	let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	res.status(200).send('You requested URI: ' + fullUrl);
})

//Äîáàâèòü â ðîóò POST /post ïðîâåðêó íà íàëè÷èå Header: Key (íà óðîâíå middleware), åñëè òàêîãî header íå ñóùåñòâóåò, òî âîçâðàùàòü 401
const middleware = function (req, res, next) {
	if (!req.headers.key) {
		res.sendStatus(401);
	} else {
		next();
	}
}


//POST /post – Ñòðàíèöà êîòîðàÿ âåðíåò âñå òåëî POST çàïðîñà (POST body) â JSON ôîðìàòå, ëèáî 404 Not Found - åñëè íåò òåëà çàïðîñà
app.get('/post', middleware, function (req, res) {
	if (Object.keys(req.body).length !== 0){
		res.status(200).json(req.body);
	} else {
		res.sendStatus(404);
	}
})

app.listen(3000);
