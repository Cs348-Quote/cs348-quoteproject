# cs348-quoteproject
The platform we are using to host our database is postgresql

To load the database into postgresql, simply: 
1. install the latest version of postgres and open pgadmin 4
2. inside of pgadmin4, create a new database 
3. using the query tool, load the database.sql files inside this repo and run it
  - insert the locationstable.sql file first, this is an empty table but is used as a placeholder
  - insert the authorstable.sql file second, the foreign key constraints are commented out as the location table is not done yet
  - insert the quotestable.sql file last, this may take several minutes
4. then refresh the database and all the tables should now be present
5. you can then the query tool again to do sql querys
6. Go to the directory ./cs348-quoteproject in cmd and run "flask run" to start the flask backend. Then proceed to frontend setup.

# Frontend Setup

`cd my-app`

Install Dependencies:

`npm i`

Run in development mode:

`npm start`
