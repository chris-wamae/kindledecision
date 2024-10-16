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

### Getting the application
### Setting up and running the application


