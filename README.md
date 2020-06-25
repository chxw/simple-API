#### Name
chxw

#### Date
6/23/2020

# API Documentation
No authentication or permissionning is required for this API. CORS is enabled for all endpoints, i.e. all endpoints are open. All endpoints branch from: https://agile-dusk-02160.herokuapp.com/.

## Passenger-related Endpoints
### Passenger requests vehicle information

User sends API username (`username`), latitude (`lat`), and longitude (`lng`) information and receives a JSON string of vehicles (`id`, `username`, `lat`, `lng`, `created_at`). The user's username, latitude, and longitude information is saved in our database as a "passenger".

**URL**: `/rides`

**Method**: `POST`

**Data constraints**:
```json
{
	"username": "[1 to 255 chars]",
	"lat": "[float]",
	"lng": "[float]" 
}
```

Partial data is not allowed.

**Data examples**
```sh
curl --data "username=tabasco&lat=-53.50180&lng=-10.94498" https://agile-dusk-02160.herokuapp.com/rides
```

**Success Response**

```json
[
   {
      "_id": "5cdf411856e9c200042989d7",
      "username": "JANET",
      "lat": 42.35495,
      "lng": -71.0509,
      "created_at": "2020-05-17T23:17:44.427Z"
   },
   {
      "_id": "5cf583acfbbfe8000445691d",
      "username": "VMerzMH8",
      "lat": 42.3542,
      "lng": -71.0704,
      "created_at": "2020-06-03T20:31:40.400Z"
   }
]
```

**Error Response**

```json
{"error":"Whoops, something is wrong with your data!"}
```

### Request passenger table

User sends the `username` of a passenger and receives all instances of data related to that passenger we have in our database.

**URL**: `/passenger.json`

**Method**: `GET`

**Data constraints**:
```json
{
	"username": "[1 to 255 chars]"
}
```

**Data examples**
```sh
curl --X GET "https://agile-dusk-02160.herokuapp.com/passenger.json?username=USERNAME"
```

**Success Response**

```json
[
   {
      "username": "USERNAME",
      "lat": 12.12,
      "lng": 12.12
   }
]
```

**Error Response**

If you do not include `username=[something]` query in your GET request or if the username you have requested information for does not exist in our database, you will receive the following response:

```json
[]
```

## Vehicle-related Endpoints

### Vehicle checks in with API

**URL**: `/checkin`

**Method**: `POST`

**Data constraints**:
```json
{
	"username": "[1 to 255 chars]",
	"lat": "[float]",
	"lng": "[float]" 
}
```

**Data examples**
```sh
curl --data "username=tabasco&lat=-53.50180&lng=-10.94498" https://agile-dusk-02160.herokuapp.com/rides
```

**Error Response**


### Request vehicle table

User sends the `username` of a vehicle and receives all instances of data related to that vehicle we have in our database.

**URL**: `/vehicle.json`

**Method**: `GET`

**Data constraints**:
```json
{
	"username": "[1 to 255 chars]"
}
```

**Data examples**
```sh
curl --X GET "https://agile-dusk-02160.herokuapp.com/vehicle.json?username=USERNAME"
```

**Success Response**

```json
[
   {
      "username": "USERNAME",
      "lat": 12.12,
      "lng": 12.12
   }
]
```

**Error Response**

If you do not include `username=[something]` query in your GET request or if the username you have requested information for does not exist in our database, you will receive the following response:

```json
[]
```

# Lab 10
A simple server-side web application (Node.js and Express) deployed to Heroku. The purpose of this lab is to understand how a web server serves dynamic and static content.

When client accesses the route `https://[YOUR_APP_IDENTIFIER_RANDOMLY_GENERATED].herokuapp.com/rides)` via `POST /rides`, the following hard-coded JSON empty list is returned as the response:

```json
[]
```

Note: accessing `/rides` on a web browser will not work (recall how web browsers work). However if you make an HTTP POST request via `curl` and send it any data (e.g., `curl --data "username=whocares" https://agile-dusk-02160.herokuapp.com/rides)`, the JSON string above will be the reponse.

The web application servest `POST /rides` with JSON `[]` as response successfully, CORS is enabled. No collaboration / discussion with others for this lab. I spent 1-2 hours on this lab.

# Lab 12

Cross-Origin Resource Sharing (CORS) is enabled for this API. Client must send POST request with legitimate `username` (string), `lat` (floating point number), and `lng` (floating point number) parameters in urlencoded form. 

Example:
``` sh
$ curl --data "username=USERNAME&lat=12.12&lng=12.12"
```

If client does not send the three inputs correctly, you will receive the following JSON:
```json
{"error":"Whoops, something is wrong with your data!"}
```

Example:
```bash
$ curl -X POST https://agile-dusk-02160.herokuapp.com/rides
$ {"error":"Whoops, something is wrong with your data!"}   
```

## Basic Requirements

- [X] Must return JSON
- [X] The required fields and exact field names for submission to this API are username, lat, and lng. If a submission is missing any one of the required fields, return the following JSON as the response: {"error":"Whoops, something is wrong with your data!"}
- [X] If all the required fields are submitted with request, API shall return a JSON array of locations of vehicles. A vehicle in the JSON array is an object with the mandatory keys: username, lat, lng, and created_at where lat and lng are numbers. Example output: [{"_id":"5cdf411856e9c200042989d7","username":"JANET","lat":42.354951,"lng":-71.0509,"created_at":"2020-05-17T23:17:44.427Z"},{"_id":"5cf583aafbbfe80004456918","username":"mXfkjrFw","lat":42.3453,"lng":-71.0464,"created_at":"2020-06-03T20:31:38.378Z"},{"_id":"5cf583aafbbfe80004456919","username":"nZXB8ZHz","lat":42.3662,"lng":-71.0621,"created_at":"2020-06-03T20:31:38.611Z"},{"_id":"5cf583aafbbfe8000445691a","username":"Tkwu74WC","lat":42.3603,"lng":-71.0547,"created_at":"2020-06-03T20:31:38.786Z"},{"_id":"5cf583aafbbfe8000445691b","username":"5KWpnAJN","lat":42.3472,"lng":-71.0802,"created_at":"2020-06-03T20:31:38.932Z"},{"_id":"5cf583abfbbfe8000445691c","username":"uf5ZrXYw","lat":42.3663,"lng":-71.0544,"created_at":"2020-06-03T20:31:39.077Z"},{"_id":"5cf583acfbbfe8000445691d","username":"VMerzMH8","lat":42.3542,"lng":-71.0704,"created_at":"2020-06-03T20:31:40.400Z"}]. A note about security: with the exception of the data requirements above, please note that I did not mention a thing about security or error handling in the requirements, including authentication. There is a reason for this, as you will see in the next lab.
- [X] Cross-Origin Resource Sharing must be enabled for POST /rides. Without this, you will encounter an error in the JavaScript console of your web browser when you load your map.

## Going Beyond
- [X] The basic requirements for POST /rides do not include storing the ride request from a passenger into a database. Store the ride request data username, lat, and lng into a Postgres database. The nodepsqlapp example is a Node.js + Express + Postgres system. One requirement: lat and lng must be stored as floating point numbers.
- [X] If you store ride request data from a passenger (see above), then it only make sense to store data on vehicles as well. Build an API route, an HTTP POST route, for vehicles to "check-in" their availability to pick up passengers. Store the vehicle data username, lat, and lng into a Postgres database. The fields are consistent with ride requests from passengers.
- [X] Write a GET /passenger.json API route that returns a list of all passenger records for a given username as a JSON string if record(s) exist in database. The mandatory parameter for this API is username. If the username query parameter is empty, not provided, or no results found, return empty JSON list [].
- [X] Write a GET /vehicle.json API route that returns a list of all vehicle records for a given username as a JSON string if record(s) exist in database. The mandatory parameter for this API is username. If the username query parameter is empty, not provided, or no results found, return empty JSON list [].
- [ ] Write a GET / route --home page, the root, the index. Accessing this on a web browser (e.g., https://[YOUR_APP_IDENTIFIER_RANDOMLY_GENERATED].herokuapp.com/) shall display list of all the vehicles and/or passengers in the database. Simply outputting JSON as the page is unacceptable; route must return HTML.
- [ ] Build another web application + server with the same basic requirements except using a different programming language and framework (e.g., using Django or Flask for Python, Rails or Sinatra for Ruby). Assess the differences and similarities in your README.

## Testing edge cases
```
ride-API % curl -X GET 'https://agile-dusk-02160.herokuapp.com/passenger.json?username='           
[]%                                                                               
ride-API % curl -X GET 'https://agile-dusk-02160.herokuapp.com/passenger.json?username=s'
[]%                                                                               
ride-API % curl -X GET 'https://agile-dusk-02160.herokuapp.com/passenger.json?username'  
[]%                                                                               
ride-API % curl -X GET 'https://agile-dusk-02160.herokuapp.com/passenger.json?'     
[]%                                                                               
ride-API % curl -X GET 'https://agile-dusk-02160.herokuapp.com/passenger.json' 
[]%                                                                               
ride-API % curl --data "username=jesus&lat=1&lng=12" https://agile-dusk-02160.herokuapp.com/rides 
{"error":"Whoops, something is wrong with your data!"}%                                              
ride-API % curl --data "username=jesus" https://agile-dusk-02160.herokuapp.com/rides
{"error":"Whoops, something is wrong with your data!"}%                                              
ride-API % curl --data "" https://agile-dusk-02160.herokuapp.com/rides 
{"error":"Whoops, something is wrong with your data!"}% 
```

# References

[https://expressjs.com/en/resources/middleware/cors.html](https://expressjs.com/en/resources/middleware/cors.html)

[https://stackoverflow.com/questions/44849082/sending-a-json-file-to-express-server-using-js](https://stackoverflow.com/questions/44849082/sending-a-json-file-to-express-server-using-js)

[https://node-postgres.com/api/client#client.query](https://node-postgres.com/api/client#client.query)

[https://devcenter.heroku.com/articles/request-timeout](https://devcenter.heroku.com/articles/request-timeout)

[https://devcenter.heroku.com/articles/error-codes#h12-request-timeout](https://devcenter.heroku.com/articles/error-codes#h12-request-timeout)

[https://stackoverflow.com/questions/31793971/node-js-problems-with-postgresql-database-insert-operation](https://stackoverflow.com/questions/31793971/node-js-problems-with-postgresql-database-insert-operation)

[https://stackoverflow.com/questions/19085609/trying-to-connect-my-node-js-to-heroku-postgresql-database-following-heroku-pos](https://stackoverflow.com/questions/19085609/trying-to-connect-my-node-js-to-heroku-postgresql-database-following-heroku-pos)

[https://stackoverflow.com/questions/20775490/how-to-create-or-manage-heroku-postgres-database-instance](https://stackoverflow.com/questions/20775490/how-to-create-or-manage-heroku-postgres-database-instance)

[https://stackoverflow.com/questions/15364817/type-of-request-body-for-expressjs](https://stackoverflow.com/questions/15364817/type-of-request-body-for-expressjs)

[https://apple.stackexchange.com/questions/51709/can-i-create-a-desktop-shortcut-alias-to-a-folder-from-the-terminal](https://apple.stackexchange.com/questions/51709/can-i-create-a-desktop-shortcut-alias-to-a-folder-from-the-terminal)

[https://www.javatpoint.com/steps-to-write-and-execute-a-shell-script](https://www.javatpoint.com/steps-to-write-and-execute-a-shell-script)

[https://stackoverflow.com/questions/46393011/postgres-how-to-view-contents-of-a-table](https://stackoverflow.com/questions/46393011/postgres-how-to-view-contents-of-a-table)

[https://www.postgresqltutorial.com/postgresql-where/](https://www.postgresqltutorial.com/postgresql-where/)

[https://www.tutorialspoint.com/postgresql/postgresql_delete_query.htm](https://www.tutorialspoint.com/postgresql/postgresql_delete_query.htm)

[https://devcenter.heroku.com/changelog-items/438](https://devcenter.heroku.com/changelog-items/438)

[https://devcenter.heroku.com/articles/heroku-postgresql#set-up-postgres-on-mac](https://devcenter.heroku.com/articles/heroku-postgresql#set-up-postgres-on-mac)

[https://stackoverflow.com/questions/51924864/express-validator-how-to-check-queries](https://stackoverflow.com/questions/51924864/express-validator-how-to-check-queries)

[https://stackoverflow.com/questions/26292267/how-do-i-check-if-query-string-has-values-in-express-js-node-js](https://stackoverflow.com/questions/26292267/how-do-i-check-if-query-string-has-values-in-express-js-node-js)

[http://expressjs.com/en/api.html#req.query](http://expressjs.com/en/api.html#req.query)

[https://node-postgres.com/features/pooling](https://node-postgres.com/features/pooling)