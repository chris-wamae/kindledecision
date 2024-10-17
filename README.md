# Kindledecision
Kindledecision is a web application that facilitates group decision making in a way that ensures everyone is on the same page. 

## How does it work
In summary, the application works by users creating topics called queries and adding other users to take part in them. 

These topics have choices that other users can select. All the users that were added to the query can view the progress of the selections and the final results at the end.

### User accounts
The application uses the emails associated with user accounts in order to keep track of who created which queries and who is participating in them. When creating an account, the user is required to create a password for purposes of securing their account. The password and email is used to login in order to view the queries and create them. Additional information that may be requested during sign up is the names of the user, this information is just meant to allow users to identify each other easily. 

### Queries
Queries are questions/topics created by users when they are looking for anwsers/opinions from specific people. After creating the query, a user then adds choices to it for which serve as the available anwsers to it. 

Finally, the creator of the query adds other app users to the query (called participants) who will be able to select a choice in the query. The application verifies the existance of each user before allowing them to be added as a participant in the query.

The creator also has the option of adding themselves as a participant in the query.

### Additional functionalities
Other things that users can do on the app are:
  1. Delete  a query they created.
  2. Delete their account.
  3. Change the email address associated with their account.

## App technologies and frameworks

The application has been developed using ReactJs for the front end and .NET(ASP .NET Web API) for the back end. The app was deployed on a Linux VPS (AWS Lightsail) using Nginx and Docker(the web api needed to be Dockerized in order for it to run on Linux). 

### Front end
The main packages used in development of the app on React are redux-toolkit for state management, axios for http requests, react-router-dom for
routing and js-cookie for cookies and sessions.

### Back end
On the back end Automapper was used for preventing protected information from being sent out during requests. Identity Framework was also used to handle Authentication and Authorization using JWT.  

## Testing the application on your computer

### Requirements 
- .NET 6.0 or greater
- MSSMS version 19.1 or greater
- Nodejs version 18.16.1 or greater
- Visual Studio

### Getting the application
Clone this repository into your local machine or download the project as a ZIP file and extract it on your computer

### Setting up and running the application
For the application to run on your local machine, you will have to make a few changes to the files. 

#### MSSQL
Open MSSQL and click on connect to server. On the menu on the left, click on databases. It should show a list of the databases you have on your machine. Right click on databases and select create new database,add the database and click ok. This is the database the application will be using to save all its data.

#### Back end

Open the project in Visual Studio. Click on search on the menu on at the top, select feature search and look up SQL Server Object Explorer and click on the first result. 

The SQL Server Object Explorer window should now be visible on the right. Click on SQL Server, a dropdown should appear. Click on the option with the name of your computer. Another menu should appear, click on databases and find the database that you  created in MSSQL.
Click on it and wait for it to finish loading. Right click on it and go to propeties. Find the Connection String field and copy its contents (starts with Data Source...)
Close the SQL Server Object Exploer window and open the Solution Explorer. Find the appSettings.json file in the main directory. 

Replace the <enter database connection string here"> text under Default Connection with the connection string you copied and save the changes.  

This step allows the web API to connect to the database.

Next navigate into the Data directory and click on the DataContext.cs file. Starting from line 57, replace the fields asking you to enter your email with whatever email you would like to use to login to the application as the super admin.

Also take note of the password on line 67, you will have to use it during login (you may also change the default value if you wish to use another password), remember to save the changes you made. 

One additional step is required before the back-end is ready to run on your computer. This step is for setting up the database for use by the application through a migration which will create all the required tables.Using the search bar on the menu at the top, search for Package Manager Console and click on the first result, it should open a terminal at the bottom of the app. 

Type in this command and click enter:

**Add-Migration Inital_Migration** 

Wait for it to finish running, there should be a new directory in the main directory of the application called Migrations if it was successful. Next, enter this command and click enter: 

**Update-Database**

Wait for it to finish running, after this you can close Visual Studio,you are done with the backend changes.

#### Front end 

In the main directory (/front-end) create a .env file.

Copy and add the line below to the file and then save the changes.

**REACT_APP_BASE_URL=http://localhost:5044/**

#### Running the application

With these changes, the application should be ready to run.
Using the terminal, navigate to the directory in which you saved the project. To get the front-end started, navigate into the front-end directory and run **npm start** to start it up.

Create a new terminal window and navigate into the project again. This time, navigate into back-end/KindleDecision/ and run **dotnet run** 


