import db from "./db.js";
/**
 * Relations
 * - User.id : 1-m : appointment
 * - services.id : 1-m : appointment
 * */

function setupUserTable(){
	return new Promise((resolve, reject) => {
		db.query("CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT PRIMARY KEY, name varchar(255) NOT NULL, email varchar(255) NOT NULL, password varchar(255) NOT NULL)", function(error, results, fields){
			if(error!=null){
				console.error("Error migrating table \"user\": " + error);
				reject(err);
			}
			else{
				console.log("Successfully created table \"user\"");
				resolve();
			}
		});
	});
}

function setupPetTable(){
	return new Promise((resolve, reject) => {
		db.query("CREATE TABLE IF NOT EXISTS pets (id INT AUTO_INCREMENT PRIMARY KEY, name varchar(255) NOT NULL, dob DATE NOT NULL, weight Decimal(10,2) NOT NULL, user_id INT, FOREIGN KEY (user_id) references user(id) ON DELETE CASCADE ON UPDATE CASCADE)", function(error, results, fields)
		{
			if(error!=null){
				console.error("Error migrating table \"pets\": " + error);
				reject(err);
			}
			else{
				console.log("Successfully created table \"pets\"");
				resolve();
			}
		});
	}); 
}

function setupServiceTable(){
	return new Promise((resolve, reject) => {
		db.query(
			"CREATE TABLE IF NOT EXISTS services (id INT AUTO_INCREMENT PRIMARY KEY, service_location varchar(255) NOT NULL, service varchar(255) NOT NULL, pet varchar(255), description varchar(255)," +
		    "imageName varchar(255) DEFAULT 'default.jpg', street_address varchar(255), " +
		    "zip varchar(10), province varchar(100), price_per_session decimal(10,2), rating INT, posted_timing varchar(255)," +
		    "INDEX service_loc (service_location), INDEX service_name (service)," +
		    "INDEX zip_idx (zip), INDEX province_idx (province), INDEX street_addr_idx (street_address)" + ")", function(error, results, fields){
					if(error!=null){
						console.error("Error migrating table \"services\": " + error);
						reject(err);
					}
					else{
						console.log("Successfully created table \"services\"");
						resolve();
					}
				});
	});
}

function setupAppointmentsTable(){
	return new Promise((resolve, reject) => {
		db.query("CREATE TABLE IF NOT EXISTS appointments (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, service_id INT NOT NULL, start_date_time DATETIME NOT NULL, end_date_time DATETIME NOT NULL, INDEX userid (user_id), INDEX serviceid (service_id), FOREIGN KEY (user_id) REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE, FOREIGN KEY (service_id) REFERENCES services(id) ON UPDATE CASCADE ON DELETE CASCADE)", function(error, results, fields){
					if(error!=null){
						console.error("Error migrating table \"appointments\": " + error);
						reject(err);
					}
					else{
						console.log("Successfully created table \"appointments\"");
						resolve();
					}
				});
	});
}

function main(){
	setupUserTable()
		.then(setupPetTable)
		.then(setupServiceTable)
		.then(setupAppointmentsTable)
		.then(()=>{
			process.exit();
		});
}

main();
