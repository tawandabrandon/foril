var express = require('express');
var router = express.Route();
var Todo = require('./site');
var Link = require('./link');
var fb = require('./db');

router.get('/', function(req,res,next){
	res.send("Here's all the sites");
});

router.get('/:link', function (req,res,next) {
	//Act upon link
	link = req.params.link;
	updateDomain(domainExtracter(link));
	if(pullLink(link) != null 'Link'){
		result = pullLink(link);
		res.render('index', { title: result.rep + '% accuracy on'+result.title, message: result })
	}else{
		createLink(link);
		savedLink = pullLink(link);
		result = authenticityChecker(savedLink);

	}
	//if link exists pull it up
	//else create new link
	//check link authenticity
	//if domain exists pull it up
	//update domain average
});

route.get('/domain/:domain', function(req,res,next){
	domain = req.params.domain;
    db.con.connect(function(err) {
        if (err) {
            console.log("an error has occured")
        } else {
            console.log("Connected!");
        }
    });

    var sql = "Select * FROM domains WHERE dName = " + domain;

    db.con.query(sql, function(err, result) {
        if (err) {
            console.log('An error occured while executing query');
            console.log(err); 
        } else {
            console.log("1 record Found");
            res.sendStatus(200);
            res.json(result);
            updateDomain(result);
        }

    });
});

function authenticityChecker(link) {
	
	return Math.random(0,100);
};

function updateDomain(domain,link){
	domain.hits =+ 1;
	domain.average = (domain.average + link.average) / 2;
};

function pullDomain(domain) {
    db.con.connect(function(err) {
        if (err) {
            console.log("an error has occured")
        } else {
            console.log("Connected!");
        }
    });

    var sql = "Select * FROM domains WHERE dName = " + domain + "";

    db.con.query(sql, function(err, result) {
        if (err) {
            console.log('An error occured while executing query');
            console.log(err); 
        } else {
            console.log("1 record Found");
            res.sendStatus(200);
            res.json(result);
        }

    });
}

function pullLink(link) {
	// get link if exists as a Link()
	//else return null
};

function domainExtracter(url) {
    var result
    var match
    if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
        result = match[1]
        if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
            result = match[1]
        }
    }
    return result
}