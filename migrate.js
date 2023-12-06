import db from "./db.js";

function setupUserTable(){
	db.query("CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT PRIMARY KEY, name varchar(255) NOT NULL, email varchar(255) NOT NULL, password varchar(255) NOT NULL)", function(error, results, fields){
				if(error!=null){
					console.error("Error migrating table \"user\": " + error);
				}
				else{
					console.log("Successfully created table \"user\"");
				}
			});
}

function setupPetTable(){
	db.query("CREATE TABLE IF NOT EXISTS pets (id INT AUTO_INCREMENT PRIMARY KEY, name varchar(255) NOT NULL, date_of_birth DATE NOT NULL, weight Decimal(10,2) NOT NULL)", function(error, results, fields){
			if(error!=null){
				console.error("Error migrating table \"pets\": " + error);
			}
			else{
				console.log("Successfully created table \"pets\"");
			}
		});
}

function setupServiceTable(){
	db.query("CREATE TABLE IF NOT EXISTS services (id INT AUTO_INCREMENT PRIMARY KEY, service_location varchar(255) NOT NULL, service varchar(255) NOT NULL, pet varchar(255))", function(error, results, fields){
				if(error!=null){
					console.error("Error migrating table \"services\": " + error);
				}
				else{
					console.log("Successfully created table \"services\"");
				}
			});
}

function main(){
	setupUserTable();
	setupPetTable();
	setupServiceTable();
}

main();
