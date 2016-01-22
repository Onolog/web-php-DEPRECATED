# Onolog Web

Repository for the Onolog web app.

## Installation

### Get the latest code
Make sure you're in a directory with a git repository. If not, run:
```
$ git init
```

Add the repository as a remote:
```
$ git remote add origin git@github.com:Onolog/web.git
```

Pull down the latest version:
```
$ git pull origin master
```

### Configure
You'll need to configure the database, the app, and possibly the server itself before everything will run.

First, create a database config file:
```
$ cp app/config/database.sample.php app/config/database.php
```
In that file, enter the information needed to connect to the DB (username, password, etc.)

Because the app uses Facebook's API, you'll also need to set up a config file with the Facebook app info (API key and secret):
```
$ cp app/webroot/js/constants/Facebook.sample.js app/webroot/js/constants/Facebook.js
```

### Dependencies
Install all the node dependencies:
```
$ npm install
```

Build the static assets file:
```
$ npm run dev
```

You should now have a working site.
