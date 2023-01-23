# Mobile Auth Using JWT
A Node.js authentication system using React Native as the front-end and leveraging MongoDB, Mongoose schema and models, password hashing, JSON Web Tokens (JWT), Express.js, and Redux for state management.</br>

## Overview ##
1.	The authentication flow for the system is presented below. In this case, the client is the mobile App, but can refer to any recieve of including wearables, IoT ![image](https://user-images.githubusercontent.com/13279722/213968138-9a53dc0e-8da4-4009-8de1-74b7c5157ee3.png)

![image](https://user-images.githubusercontent.com/13279722/213968184-e78d6965-6f01-4da7-b936-de10ad6e7793.png)
 2. There are 2 main screens presented in this demo example, the registration screen (for new users) and the login screen (for existing users): </br>
 ![image](https://user-images.githubusercontent.com/13279722/213968252-5f103571-e054-4dea-80ff-061d3aa43745.png)
 
2.	Authentication can use numerous attributes, but in this case, we are going to use email and password to illustrate the process.</br>
3.	The token in this system will be stored on the client's side, which in our case is the React Native app. Async storage will be used to accomplish this. Authenticated data from the user (after initial registration) will be stored in MongoDB.</br>
4. Code has database connection information removed. Update the connection to the backend in the server file --> index.js:</br>

![image](https://user-images.githubusercontent.com/13279722/213968348-a356f922-f3a2-44fd-961e-81d29ffa3911.png)

5.	The auth system currently runs on the localhost. This will need to be deployed to a backend cloud host (ex. Heroku) for production usage.

## Features/Functionality ##
1.	Validation: </br>
    * Formik – Provides form-level validation. (https://formik.org/docs/guides/validation) 
    * Yup – A schema builder for value parsing and validation. (https://github.com/jquense/yup) </br>
    
    ![image](https://user-images.githubusercontent.com/13279722/213968575-9229852c-a610-419e-bd2c-2fd07d6f1d29.png)
    
2.	Middleware is used to create a protected route (using JWT). </br>
3.	Hashed version of passwords stored in backend MongoDB.</br>

## Some Considerations/Comments If Using Code ##
1.	Ensure all dependencies are added. </br>
2.	Update the MongoDB cloud url to the correct one (after you make an account). </br>
3.	Use a back-end hosting service, like Heroku.
    --> Once you do this, update your fetch urls in the front end to correspond to the updated endpoints in Heroku or any other backend hosting service used. </br>
4.	Where the home page in the client (the front-end React Native app) is in this example auth app, is where the entry point to your app would be. </br>
5.	At that point, passing props such as name or other properties to link the correct information in the database to your user is required. </br>





