var firebase = require('firebase');

  // Initialize Firebase
  var config = {
    serviceAccount: "./foril-5d9f1091f9fd.json",
    databaseURL: "https://foril-zim.firebaseio.com"
  };

  firebase.initializeApp(config);
  //firebase.database.enableLogging(true);

  var sitesRef = firebase.database().ref('domains/sites/');

function Create(domain) {
	sitesRef.push({
		domain: domain.domain,
		hits: domain.hits,
		average: domain.average
	}).then(function(){
		console.log(domain.domain + ' was added successfully!').catch(function(error){
			console.log(domain.domain + ' Saving failed');
		});
	});
}


function Delete(domain) {
	sitesRef.once('value', function (snapshot, error, result) {

		snapshot.forEach(function (childSnapshot) {
			if(childSnapshot.val().domain == domain){
				this.result = childSnapshot.key;
			};
	});

	delRef = firebase.database().ref('domains/sites/'+this.result);
	  delRef.remove()
	  .then(function() {
	    console.log(this.result + " was successfully removed")
	  })
	  .catch(function(error) {
	    console.log("Delete failed " + error.message)
	  });

	});

}


function Update(domain) {
	sitesRef.once('value', function (snapshot, error, result) {

		snapshot.forEach(function (childSnapshot) {
			if(childSnapshot.val().domain == domain.domain){
				this.result = childSnapshot.key;
			};
	});
	
	delRef = firebase.database().ref('domains/sites/'+this.result);
	  delRef.update({
	  	average: domain.average,
	  	hits: domain.hits
	  })
	  .then(function() {
	    console.log(domain.domain + " was successfully updated")
	  })
	  .catch(function(error) {
	    console.log("Update failed " + error.message)
	  });
});
}


function Search(domain, res) {

	sitesRef.once('value', function (snapshot, error, result) {
		snapshot.forEach(function (childSnapshot) {
			if(childSnapshot.val().domain == domain){
				res.json(childSnapshot.val());
			};
	});
	});
}

