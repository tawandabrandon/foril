var express = require('express');
var router = express.Router();
var Site = require('./site');
var Link = require('./link');
var db = require('./db');


router.get('/new/:domain', function(req,res,next){
	domain = req.params.domain;
	console.log('Contents of domain:'+domain);
	newSite = new Site(domain,0,0);
	 saveSite(newSite,res);
});

router.get('/:domain*', function(req,res,next){
	console.log('request recieved by Domain router GET')

	domain = req.params.domain;

	//implement domain check here, might not be necessary since crawler will return 404?

	//if domain exists pull it up

    db.con.connect(function(err) {
            console.log("Connected!");

            if (domain != '') {

            	var sql = "Select * FROM domains WHERE dName = '" + domain + "'";
            	console.log(sql);
				db.con.query(sql, function(err, result) {
				    if (err) {
				        console.log('An error occured while executing query');
				        console.log(err);
				        //notify front-end
				    } else {
				        console.log("Returning result: "+ result);
				        if (result == '') {
				        	console.log(domain + ' not found, creating new entry.');
				        	newSite = createDomain(domain);
				        	saveSite(newSite,this.res);
				        	updateDomain(domainExtracter(newSite.domain));
				        	res.type('json');

				        	res.json(newSite);
				        }else{
				        	console.log('result is: ' + result);
				        	res.type('json');

				        	res.json(result);
				        	//updateDomain(domainExtracter(result.url));
				        }
				    }
			    });
            }else{
            	var sql = "Select * FROM domains";

				db.con.query(sql, function(err, result) {
				    if (err) {
				        console.log('An error occured while executing query');
				        console.log(err);
				        //notify front-end
				    } else {
				        console.log("Returning result");
				        res.json(result);
				    }
			    });
            }
    });
    //close connection
     //db.con.destroy();

});


//FUNCTIONS
function  saveSite(domain,res){
	    db.con.connect(function(err) {
        if (err) {
            console.log("an error has occured")
        } else {
            console.log("Connected!");
		    var sql = "INSERT INTO domains(dName,hits,rep) VALUES('"+domain.domain+"',"+domain.hits+','+domain.reputation+')';
		    //automatic escaping of Queries?
		    db.con.query(sql, function(err, result) {
		        if (err) {
		            console.log('An error occured while executing query');
		            console.log(err); 
		        } else {
		            console.log("1 record Found");
		            //revisit this section
		            res.json(result);
		        }

		    });
        }
    });
	    //close connection to database
	    // db.con.destroy();
}

//Should be seperate module?
function authenticityChecker(link) {
	
	return Math.random(0,100);
};

function updateDomain(domain){
	domain.hits =+ 1;
	db.con.connect(function(err) {
        if (err) {
            console.log("an error has occured")
        } else {
            console.log("Connected!");
		    var sql = "UPDATE domains SET hits = "+domain.hits+1+" WHERE dName = '" + domain + "'";
		    //automatic escaping of Queries?
		    db.con.query(sql, function(err, result) {
		        if (err) {
		            console.log('An error occured while executing query');
		            console.log(err); 
		        } else {
		            console.log(domain.domain+" Updated, new value for hits: "+domain.hits);
		        }

		    });
        }
    });
	saveSite(domain);
};

//should there be need to pullUp a specific domain?
function pullDomain(domain) {
    db.con.connect(function(err) {
        if (err) {
            console.log("an error has occured")
        } else {
            console.log("Connected!");
		    var sql = "Select * FROM domains WHERE dName = " + domain + "";
		    //automatic escaping of Queries?
		    db.con.query(sql, function(err, result) {
		        if (err) {
		            console.log('An error occured while executing query');
		            console.log(err); 
		        } else {
		            console.log("1 record Found");
		            //revisit this section
		            res.sendStatus(200);
		            res.json(result);
		        }

		    });
        }
    });

}

function pullLink(link) {
	// get link if exists as a Link()
	//else return null
	///if need be :)
};
//regex for cleaning url
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

function createDomain(site){
	newSite = new Site(site,0,0);
	return newSite;
}

module.exports = router;