
# Project Title

This project is a Blog application that has the following features.
1. Add blogs with a title and description
2. View all blogs with pagination
3. Update blogs
5. Delete blogs
6. A dark mode and light mode for the application using Context API
7. Register users with name, email and password
8. Login with users to create, update and delete blogs

## Documentation

I have used Vite App because it is faster than CRA. 

I have written API's in Expressjs, and properly handled errors and well as logging. The folder structure comprises routes, models, controllers and services. I have implemented authentication using passportjs jwt strategy and bcrypt for hashing password. 

The frontend dark mode state management is done using Context API. Routing is handled through react-router-dom. 

## Installation

After cloning, run:
```
cd client
npm install
npm run dev

cd server
npm install
npm start
```

    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in the server directory.
```
`MONGO_CONNECTION_STRING = mongodb+srv://usiddique09:usman@cluster0.grcckce.mongodb.net/`
`JWT_SECRET_KEY = c83d1500a683fd5a872ec710c7ca25a73a3eff31eb1064fcf1f6bfcd0d159d31733d26df202a545e63bde1cea3c82fb82726374d6f615620e0ca3487ab845004`
```

For your ease, you can use my mongodb instance since I have seeded some data into it. I have whitelisted all api's. 

Add another .env in the client directory.
```
`VITE_SERVER_URL = http://localhost:3000`
```

## User accounts
If you do not want to create new user accounts, you can use existing account. Only hashed passwords are stored in the database.  

```
email: usiddique09@gmail.com
password: usman
```

#### The client runs on localhost:5173 and the server runs on localhost:3000.
