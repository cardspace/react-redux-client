

## Build new environment.

### Create infrastructure

* (db) - create a mongodb database https://mlab.com/home
* (auth) - create an authentication client https://manage.auth0.com/#/
* (api) - create the service project https://dashboard.heroku.com/apps
* (client) - create the client project https://console.firebase.google.com/

### Deploy api

* Add the environment setting to the service project
* Add the service project as a git remote
* Push the service to the service project remote

### Deploy client

* Configure the callback url in the authentication client
* Create the environment configuration, wwebpack setting and npm commands for the environment
* Create the firebase environment ( firebase use --add )
* Deploy the application
