var express = require('express');
var router = express.Router();
var Site = require('./site');
var Sites = require('./sites');
var Link = require('./link');
var db = require('./db');


router.get('/:link*', function(req,res,next){
	console.log('request recieved by Link router GET')

	link = req.params.link;

	//implement domain check here, might not be necessary since crawler will return 404?

	//if link exists pull it up

    db.con.connect(function(err) {
            console.log("Connected!");

            if (link != '') {
            	var sql = "Select * FROM links WHERE url = '" + link + "'";

				db.con.query(sql, function(err, result) {
				    if (err) {
				        console.log('An error occured while executing query');
				        console.log(err);
				        //notify front-end
				    } else {
				        console.log("Returning result: "+ result);
				        if (result == '') {
				        	console.log(link + ' not found, creating new entry.');
				        	newLink = createLink(link);
				        	saveLink(newLink,this.res);
				        	updateDomain(domainExtracter(newLink.url));
				        	res.type('json');

				        	res.json(newLink);
				        }else{
				        	console.log('result is: ' + result);
				        	res.type('json');

				        	res.json(result);
				        	//updateDomain(domainExtracter(result.url));
				        }
				    }
			    });
            }else{
            	var sql = "Select * FROM links";

				db.con.query(sql, function(err, result) {
				    if (err) {
				        console.log('An error occured while executing query');
				        console.log(err);
				        //notify front-end
				    } else {
				        console.log("Returning result");
				        res.json(result);
				        updateDomain(result);
				    }
			    });
            }
    });
    //close connection
     //db.con.destroy();

});

function updateDomain(domain){
//update domain code comes here
}


//FUNCTIONS
function  saveLink(link,res){
	console.log('####################'+link);
	    db.con.connect(function(err) {
            console.log("Connected!");
		    var sql = "INSERT INTO links(url,title,body,accuracy) VALUES('"+link.url+"','"+link.title+"','"+link.body+"',"+link.accuracy+")";
		    //automatic escaping of Queries?
		    db.con.query(sql, function(err, result) {
		        if (err) {
		            console.log('An error occured while executing query');
		            console.log(err); 
		        } else {
		            console.log("1 record Found");
		            //revisit this section
		            //this.res.json(result);
		        }

		    });
    	});
	    //close connection to database
	    // db.con.destroy();
}

//Should be seperate module?
function authenticityChecker(link) {
	
	link.accuracy = Math.random(0,100);
};


//should there be need to pullUp a specific link?
function pullLink(link) {
    db.con.connect(function(err) {
        if (err) {
            console.log("an error has occured")
        } else {
            console.log("Connected!");
		    var sql = "Select * FROM links WHERE dName = " + link + "";
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

function createLink(link){
	console.log('creating link from: '+link);
	newLink = new Link(this.link,"","",0);
	console.log(newLink);
	authenticityChecker(newLink);
	scrapper(newLink);

	return newLink;
}

function scrapper(link) {
	link.title = "Advanced Level ZIMSEC results now out, passrate lower than expected";
	link.body = "Minister of Education Hon David Coltart has advised that Zimbabwe Schools Examinations Council (Zimsec) A level students will have a nervous weekend because their results come out Monday.";
}

module.exports = router;