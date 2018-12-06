## Important note about configuration file:
After installing the application, you will also need to set up a configuration file located in:

`/src/config/config.js`

Such file contains the following:

`// ==========================`

`// Port (Application Port)`

`//===========================`

`process.env.PORT = process.env.PORT || Insert_your_preferred_port;`

`// ==========================`

`// Environment (PROD would be set via environment variables)`

`//===========================`

`process.env.NODE_ENV = process.env.NODE_ENV || 'dev';`


`// ==========================`

`// Database `

`//===========================`

`let dbUser;`

`let dbPassword;`

`let dbHost;`

`let dbName;`

`if (process.env.NODE_ENV === 'dev') {`

`    dbUser = 'dev_db_user';`

`    dbPassword = 'dev_db_password';`

`    dbHost = 'localhost';`

`    dbName = 'your_db';`

`} else {`

`    dbUser = process.env.DB_USER; // To be defined in environment variables`
    
`    dbPassword = process.env.DB_PASSWORD; // To be defined in environment variables`
    
`    dbHost = process.env.DB_HOST; // To be defined in environment variables`
    
`    dbName = process.env.DB_NAME; // To be defined in environment variables`

`}`

`process.env.DB_USER = dbUser;`

`process.env.DB_PASSWORD = dbPassword;`

`process.env.DB_HOST = dbHost;`

`process.env.DB_NAME = dbName;`

`// ==========================`

`// S3 Buckets`

`//===========================`
`process.env.S3_BASE_URL = process.env.S3_BASE_URL || 'Insert_S3_Bucket_URL_here';`

`process.env.S3_THUMBNAIL_PREFIX = process.env.S3_THUMBNAIL_PREFIX || '/thumbnails';`

`process.env.S3_FULLSIZE_PREFIX = process.env.S3_FULLSIZE_PREFIX || '/full-size';`


_____________________________________________

# tds-code-challenge-lambda-and-ec2-server
Code challenge for TheDigital.Support. Contains the logic for the Lambda function and server that interact with the database.

