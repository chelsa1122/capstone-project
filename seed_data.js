import db from "./db.js";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function generateServices(startId, endId){
	var services = [];
	var addresses = [
		"1409 Calico Drive",
		"509 Rideau St",
		"8271 Manor Station Ave",
		"648 Cooler St",
	];
	var locations = [
		{service_location: "montreal", province: "quebec", "zip": "h1ah5b" },
		{service_location: "Ottawa", province: "Ontario", "zip": "K1N5Z5"},
		{service_location: "Riverview", province: "New brunswick", "zip": "E1B6R0"},
		{service_location: "Matane", province: "quebec", "zip": "G4W4V4"},
		{service_location: "Toronto", province: "Ontario", "zip": "M4Y2E5"},
		{service_location: "waterloo", province: "Ontario", "zip": "N2J2W2"},
		{service_location: "Kitchener", province: "Ontario", "zip": "N2G4M4"},
	];
	var names = ["WasheeDog", "Doggie Tailored", "Doggy Dash", 
				 "Pup Salon", "Furry Fixers", "Pet Spa", 
				 "Canine Queen",
				];
	var descriptions = [
		"Unleash the Beauty: Pamper Your Pooch with Pawsome Grooming!",
	];
	var imageNames = [
		"tailspin.jpg", 
		"zen.jpg", 
		"dog-wash-1.jpg", 
		"dog-wash-2.jpg",
	];
	var dbId = startId;
	for(var i = 0; i<addresses.length; i++){
		for(var j=0; j < locations.length; j++){
			services.push(
				{
					id: dbId,
					service_location: locations[j].service_location,
		            service: names[getRandomInt(names.length)] + " Grooming Service",
		            description: descriptions[getRandomInt(descriptions.length)],
		            imageName: imageNames[getRandomInt(imageNames.length)],
		            street_address: addresses[i],
		            province: locations[j].province,
		            zip: locations[j].zip,
		            price_per_session: "50.00",
		            posted_timing: "10:00 am - 7:00 pm",
		            rating: Math.min(Math.max(3, getRandomInt(6)), 5), // 3-5 stars.
				}
			);
			dbId++;
		}
	}
	return services;
}

var seedData = [
	{ 
		table: "services",
		columns: [
								"id",
								"service_location",
								"service",
								"description",
								"imageName",
								"street_address",
								"province",
								"zip",
								"price_per_session",
								"posted_timing",
								"rating",
							],
		data: [
			{
				id: 1,
				service_location: "toronto",
        service: "Zen Dog Service",
        description: "Unleash the Beauty: Pamper Your Pooch with Pawsome Grooming!",
        imageName: "zen.jpg",
        street_address: "584 Church Street",
        province: "Ontario",
        zip: "M4Y2E5",
        price_per_session: "50.00",
        posted_timing: "10:00 am - 7:00 pm",
        rating: 4,
      },
      {
      	id: 2,
				service_location: "toronto",
        service:"Tailspin Dog spa",
        description: "From Fluff to Fabulous: Tail-wagging Elegance Awaits at Our Grooming Salon!",
        imageName: "tailspin.jpg",
        street_address: "12 Irwin Avenue",
        province: "Ontario",
        zip: "M4Y1K9",
        price_per_session: "50.00",
        posted_timing: "10:00 am - 7:00 pm",
        rating: 4,
	    },
		].concat(generateServices(3)),
	}
];

function displaySeedData(){
	for(var i=0; i< seedData.length; i++){
		console.log("SEED DATA");
		console.log("Table: " + seedData[i].table + " with " + seedData[i].data.length + " rows");
		for(var j = 0; j < seedData[i].data.length; j++){
			console.log(seedData[i].data[j]);
		}
	}
}

function getNumRows(table){
	var checkQuery = "SELECT COUNT(*) AS count FROM " + table;

	return new Promise((res, reject) => {
		db.query(checkQuery, [table], (error, results) => {
		  if (error) {
			  console.error('Error checking data:', error);
		    reject(error);
		  }
		  else{
	    	res(results);
	    }
		});
	});
}

function insertRows(table, rows, cols){
	var insertQuery = "INSERT INTO " + table + " (" + cols.join(',') + ") VALUES (" + cols.map(x=>{return '?'}).join(',') + ")"; 
	
	console.log(insertQuery);
	var allRows = [];
	for(var i = 0; i<rows.length; i++){
		var row = rows[i];
		var values = cols.map(c => {return row[c]});
		allRows.push(new Promise((res, rej) => {
			db.query(insertQuery, values, (error, results)=>{
				if(error){
					console.error('Error seeding data:', error);
					rej(error);
				}
				else{
					res(results);
				}
			});
		}));
	}
	return Promise.all(allRows);
}

function seedDataBase(){
	var allTables = [];
	for(var i=0; i< seedData.length; i++){
		var table = seedData[i].table;
		var data = seedData[i].data;
		var columns = seedData[i].columns;
		console.log("Seeding table: " + table + " with " + data.length + " rows");
		allTables.push(
			getNumRows(table)
				.then(function(results){
					return results[0].count == 0;
				})
				.then(function(shouldInsert){
					if(shouldInsert){
						return insertRows(table, data, columns);
					}
				})
		);
	}

	Promise.all(allTables).then(()=>{
		console.log("Finished seeding all data");
		process.exit();
	});
}

// displaySeedData();

seedDataBase();
