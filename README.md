# Injection Attacks - Secure Systems Assignment Two
This repository holds the code for the secure systems assignment two.
The code in this reposiotory is for a web application based upon a [React](https://reactjs.org/) Frontend, a Express backend [Express](https://expressjs.com/) backend for a REST API and a [MySQL](https://www.mysql.com/) database.

The purpose of this application is to demonstrate a SQL injection attack and a command injection attack.
This README file explains how the application can be setup using this git repository. 

This readme file does not exaplain how to run the attack, this is explained in the report however **the steps in this readme file must be carried out before running the attack detailed in the report.**

The configuration of this project has 4 sections.

1. [NodeJS and NPM setup](#node-js-and-npm-setup) - Sets up the programming languages needed
2. [Backend](#backend-configuration---expressjs-rest-api)  - Goes through the installation of backend dependecies 
3. [Database](#database-configuration---mysql-setup) - Goes through the database setup. 
4. [Frontend](#frontend-configuration---react-js-setup) - Goes through the frontend dependencies.  
5. [Running App](#running-app) - Goes through how to run the Frontend and Backend. 

To clone the repo use the following command. 
```
git clone https://github.com/WarrenK-design/InjectionAttacks
```

## Node JS and NPM setup 
A version of [NodeJS](https://nodejs.org/en/) is required to run the project, install it from their website if not already installed. 
Alternatively the [Node Version Manager](https://github.com/nvm-sh/nvm) can be used and is generally recommended as different versions of NodeJS can be easily installed and switched between. 
The version used within the development of this project was Node v14.18.1 but newer versions are compatible. 

A package manager needs to be installed so Node packages can be accesed. 
The [node package manager](https://www.npmjs.com/) (npm) allows for access to packages to be used in development (NodeJS version of Pythons Pip).
A version of npm should be installed when NodeJS has been installed, if not it can be installed seperately. 

To check the installation is succsessful run the following commands. 
```
$ node --version && npm --version
v14.18.1
6.14.15
```
## Backend Configuration - ExpressJS REST API 
This section goes through the configuration of the backend Express JS REST API. 
The API will receive HTTP requests from the frontend to request access to data from the database. 
The backend will fetch data from the database and return JSON reponses containing data. 

Change directories to the backend directory. 
```
cd backend
```
First the packages required for the backend which are defined in the ```package.json``` directory need to be installed. Run the command below to this using the npm node package manager. 
```
npm install
```
A ```node_modules``` folder should now be created which contains all the code for the packages. 

To test that the backend can be run execute the following command, it starts the server listening on port 5000. 
```
$ npm start
> backend@1.0.0 start /home/pi/security/InjectionAttacks/backend
> node server.js

Server listening on port 5000
Could not connect to the database Error: connect ECONNREFUSED 127.0.0.1:3306
```
You get a database error as the database has not been setup yet, this will be fixed in the next section. 
The backend is now setup. 

## Database Configuration - MySQL Setup  
The database used within this project is a MySQL Server database. Depending upon the operating system there are different ways of installing this and it is best consulting the documentation on the [MySQL website](https://dev.mysql.com/).

A link to the community server download page can be found [here](https://dev.mysql.com/downloads/mysql/) which is free to download and install. 

Alternatively the MariaDB server can be installed though apt  using the command line. This repository has been tested using a windows OS with MySQL server downloaded from the MySQL website and on a Raspian Linux OS using the Maria DB server.
Note the SQL injection attack on the database can be performed on Windows but the command injection attack can only be performed on a Linux OS so it is reccomnded to use a Linux OS. 

The commands used to install MariaDB on Raspian used for this project are listed below obtained from the website [here](https://pimylifeup.com/raspberry-pi-mysql/). Similiar tutorials can be found online for different linux distrbutions.  

```
$ sudo apt install mariadb-server
```
The MariaDB server should then be started as a background process. 
```
$ sudo systemctl status mariadb
● mariadb.service - MariaDB 10.3.34 database server
   Loaded: loaded (/lib/systemd/system/mariadb.service; enabled; vendor preset: enabled)
   Active: active (running) since Sun 2022-04-03 00:36:04 IST; 1 weeks 2 days ago
```
A ```root``` user needs to be set up, this step is recommended to secure the installation. 
Run the command below and if a more secure installation is required answer ```Y``` to all prompts. 

Remeber the password you give during this process as you will need it later. 
```
sudo mysql_secure_installation
``` 

Now you can login to the MySQL database using the MySQL cli installled with MariaDB, the command below logs in as the ```root``` user, you will be prompted for the password set. 
```
sudo mysql -u root -p
```

You should now be in the MySQL cli interface. The database used for this application is called ```classicmodels``` create it using the command below. 
```
CREATE DATABASE classicmodels;
```

Now need to create a user called ```SecurityAssignment``` with a password of ```Security*123```. 
This can really be whatever the user wants but if you change it you need to change the configuration in the ```.env``` file of the backend directory so I reccomend you use the username and password shown below. 
```
CREATE USER 'SecurityAssignment'@'localhost' IDENTIFIED BY 'Security*123';
```
Now you need to grant all permessions for the ```SecurityAssignment``` user to the ```classicmodels``` database so it can access it from the application. 
```
GRANT ALL PRIVILEGES ON classicmodels.* TO 'SecurityAssignment'@'localhost';
```
You now need to flush the privileges table so that the new permissions will take effect. 
```
FLUSH PRIVILEGES
```
The MySQL cli can now be exited, the next step is to populate the database. 

Go to the ```backend``` directory of this repository.
```
$ cd backend
```
There should be a ```.env``` file which contains the following information for environment variables in this directory. 
```
PORT=5000
DB_HOST=localhost
DB_USERNAME=SecurityAssignment
DB_PASSWORD=Security*123
DB_NAME=classicmodels
```
There is a custom npm script defined in the package.json file called ```seedData``` which executes the script at ```database/seeding/seedData.js```. This script executes the SQL in the file ```database/seeding/mysqlsampledatabase.sql``` on the database which populates the ```classicmodels``` database. The SQL script was obtained online [here](https://www.mysqltutorial.org/mysql-sample-database.aspx), it is a database for a classic car retailer. 

Run the command below from the ```backend``` directory to populate the database, the following output should be displayed upon success.
```
$ npm run seedData

> backend@1.0.0 seedData /home/pi/security/InjectionAttacks/backend
> node database/seeding/seedData

Connected to database
Data sucfully seeded to classicmodels database
```
You can go back to the MySQL cli to ensure that the database has been seeded and the ```SecurityAssignment``` user can access it if you want. 
```
$ sudo mysql -u SecurityAssignment -p
Enter password: 

MariaDB [(none)]> use classicmodels;
Database changed
MariaDB [classicmodels]> show tables;
+-------------------------+
| Tables_in_classicmodels |
+-------------------------+
| customers               |
| employees               |
| offices                 |
| orderdetails            |
| orders                  |
| payments                |
| productlines            |
| products                |
+-------------------------+
```

Go back to the backend directory and now try running the Express REST API again using the command below, the error about the database connection should no longer be there. 
```
$ npm start

> backend@1.0.0 start /home/pi/security/InjectionAttacks/backend
> node server.js

Server listening on port 5000
Connected to database
```

## Frontend Configuration - React JS Setup 
The frontend is a [React](https://reactjs.org/) application and provides a way with interfacing with the data in the backend through a nice user dashboard. It was initialised using the [create react app](https://reactjs.org/docs/create-a-new-react-app.html) to get a base template. 

Change to the frontend directory.
```
$ cd frontend
```
The dependencies need to be installed for the frontend, do this using the npm command below. 
```
npm install
```
This should create a ```node_modules``` folder in the frontend which contains the package code. 

In the forntend there is a ```.env``` file which contains an environment variable called ```REACT_APP_API_URL```.
This is used in the application to tell the frontend where to make API requests to. 
This should be set to the backend url which is running on the localhost port 5000. If this is different for your setup then can change it here. 

Contents of ```.env``` for frontend. 
```
REACT_APP_API_URL=http://localhost:5000
``` 

To run the application execute the command below in the frontend directory. 
```
npm start
```
This will start the application running on port 3000 of localhost. Open a browser and naviagte to http://localhost:3000 and the frontend application should display a homepage for the application. 

## Running App
At this point the Backend, Database and Frontend should all be setup as described in the sections above, **IF YOU HAVE NOT DONE THIS GO BACK AND DO IT**.

Open a terminal, naviagte to the backend directory and execute the command below. 
```
$ cd backend
$ npm start 
> backend@1.0.0 start /home/pi/security/InjectionAttacks/backend
> node server.js

Server listening on port 5000
Connected to database
```

Open a **different terminal**, change directory to the frontend directory and execute the following command.  
```
$ cd frontend 
$ npm start
```
Naviagting to http://localhost:3000 should now display the frontend. 

This concludes the setup of the environment, please go to the report submitted with this assignment to see how to run the attacks. 

