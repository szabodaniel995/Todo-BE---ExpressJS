Instructions:

  1 - Database setup: <br />
    Fire up PgAdmin (or your preferred localhost DB tool) // or use the credentials of a hosted database <br />
      Create two databases - one for development, one for testing <br />
      Create a .env file in the root directory of the backend with the following content <br />
      <br />
        PORT = <br />
        SECRET =  <br />
        DB_USERNAME =  <br />
        DB_PASSWORD =  <br />
        HOST =  <br />
        DB_PORT =  <br />
        DATABASE =  <br />
        TEST_DATABASE = <br />
         <br />
          Populate the .env file according to your liking (PORT, SECRET) & with the connection parameters of the databases that you want to connect to
    
          Create a config file in the config folder (config/config.json) with the following content, and populate it with the same credentials <br />
          Note - referencing the .env file does not work here. This is a dependency of the Sequelize CLI for handling the migrations <br />
            {
                "development": {
                    "username": ,
                    "password": ,
                    "database": ,
                    "host": 
                    "port":,
                    "dialect": 
                },
                "test": {
                    "username": ,
                    "password": ,
                    "database": ,
                    "host": ,
                    "port":,
                    "dialect": 
                },
                "production": {
                    "username": "root",
                    "password": null,
                    "database": "database_production",
                    "host": "127.0.0.1",
              "port": 1234,
                    "dialect": "postgres"
                }
            }
  
  2 - Run the migrations (create the DB tables): <br />
  npm run db:migrate <br />
  npm run db:migrate:test <br />
 <br />
  
  3 - Run the tests: <br />
    npm run test <br />
  
  4 - Fire up the backend: <br />
    npm run dev <br />
