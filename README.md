## Name
chxw

## Date
6/23/2020

## Summary

A simple server-side web application (Node.js and Express) deployed to Heroku. The purpose of this lab is to understand how a web server serves dynamic and static content.

When client accesses the route `https://[YOUR_APP_IDENTIFIER_RANDOMLY_GENERATED].herokuapp.com/rides)` via `POST /rides`, the following hard-coded JSON empty list is returned as the response:

```
[]
```

Note: accessing `https://[YOUR_APP_IDENTIFIER_RANDOMLY_GENERATED].herokuapp.com/rides)` on a web browser will not work (recall how web browsers work). However if you make an HTTP POST request via `curl` and send it any data (e.g., `curl --data "username=whocares" https://[YOUR_APP_IDENTIFIER_RANDOMLY_GENERATED].herokuapp.com/rides)`, the JSON string above will be the reponse.

The web application servest `POST /rides` with JSON `[]` as response successfully, CORS is enabled. No collaboration / discussion with others for this lab. I spent 1-2 hours on this lab.

### Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ npm install
$ npm start
```
Alternatively: 
```sh
$ heroku local web
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

### Deploying to Heroku

``` sh
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

### Visit deployed app at URL

``` sh
$ heroku open
```

## References

[https://expressjs.com/en/resources/middleware/cors.html](https://expressjs.com/en/resources/middleware/cors.html)