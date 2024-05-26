Instructions:

  1 - Database setup: <br />
    Fire up PgAdmin (or your preferred localhost DB tool) // or use the credentials of a hosted database <br />
      Create a database <br />
      Create a .env file in the root directory of the backend with the following content <br />
        PORT = <br />
        SECRET =  <br />
        DB_USERNAME =  <br />
        DB_PASSWORD =  <br />
        HOST =  <br />
        DB_PORT =  <br />
        DATABASE =  <br />
    
          Populate the .env file according to your liking (PORT, SECRET) & with the connection parameters of the database you want to connect to
    
          Create a config file in the config folder (config/config.json) with the following content, and populate it with the same credentials 
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
    
          config.json is used for the auto migrations with sequelize
            Note - Only the ’development’ part of the config.json is taken into account atm
            Test DB is not set up with sequelize. Tests will run on the main DB at this moment
          
          .env is used for the actual running of the backend
            Ideally, this would get migrated to work with the CLI 100%, also having the types of the entities created with Sequelize annotated (future todo)
  
  2 - Run the migrations (create the DB tables): <br />
    npx sequelize-cli db:migrate <br />
  
  3 - Run the tests: <br />
    npm run test <br />
  
  4 - Fire up the backend: <br />
    npm run dev <br />
