** Install some packages:

$ npm install express --save
$ npm install body-parser --save
$ npm install cookie-parser --save
$ npm install multer --save

$ npm install router --save
$ npm install mongodb --save

// Using for authentication
// HEADER { 'authorization': 'JWT <encodeJWT>'}
$ npm install jsonwebtoken
$ npm install bcrypt
$ npm install uuid


// Using for .env
$ npm install dotenv

** DEBUG
npm install -g nodemon

** Design Pattern: Factory Method


** How to test server???
1. Right click server folder and choose 'Open In Terminal'.
2. Run command 'node server.js' for old version or 'node api.js' for new version.
3. Open Postman application and test api.


** APIs

+++ Create New User
POST /auth/register HTTP/1.1
Host: 127.0.0.1:3000
Content-Type: application/x-www-form-urlencoded
cache-control: no-cache
Postman-Token: a397f09c-a274-4163-b343-dcd6e06b1222

firstName=Test&lastName=Admin&gender=Female&phone=090128231&email=admin%40fmail.com&password=123

+++ Login
POST /auth/signin HTTP/1.1
Host: 127.0.0.1:3000
Content-Type: application/x-www-form-urlencoded
cache-control: no-cache
Postman-Token: 94422f09-e558-4fe6-9686-ab490f34cf6c

email=admin%40fmail.com&password=123

+++ Get All Users
GET /auth/all HTTP/1.1
Host: 127.0.0.1:3000
authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGZtYWlsLmNvbSIsIl9pZCI6IjVjYzdkMjgyOTY5MzBhNDBmODgwNjA2NSIsImlhdCI6MTU1NjYwMTk1NX0.8RF9zvgXV0MusCRP-WWSr9ZBl37Pwb5GMIKigRMUPuw
cache-control: no-cache
Postman-Token: e11654b7-f2a7-487c-b4c7-fc89d930ae30

+++ Get All Products
GET /product/all HTTP/1.1
Host: 127.0.0.1:3000
authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGZtYWlsLmNvbSIsIl9pZCI6IjVjYzdkMjgyOTY5MzBhNDBmODgwNjA2NSIsImlhdCI6MTU1NjYwMTk1NX0.8RF9zvgXV0MusCRP-WWSr9ZBl37Pwb5GMIKigRMUPuw
cache-control: no-cache
Postman-Token: e11654b7-f2a7-487c-b4c7-fc89d930ae30

+++ Add New Product
POST /product/ HTTP/1.1
Host: 127.0.0.1:3000
authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGZtYWlsLmNvbSIsIl9pZCI6IjVjYzdkMjgyOTY5MzBhNDBmODgwNjA2NSIsImlhdCI6MTU1NjYwMTk1NX0.8RF9zvgXV0MusCRP-WWSr9ZBl37Pwb5GMIKigRMUPuw
cache-control: no-cache
Postman-Token: e11654b7-f2a7-487c-b4c7-fc89d930ae30

Request:
{
	"categoryID": "1"
	"name": "Pocket cotton sweatshirt",
	"price": 495,
	"main_image": "https://cdn.pixabay.com/photo/2017/08/06/12/04/people-2591867_960_720.jpg",
	"short_description": "Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Pellentesque diam dolor, elementum etos lobortis des mollis ut...",
	"description": "Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Pellentesque diam dolor, elementum etos lobortis des mollis ut...",
	"images": [
		"https://cdn.pixabay.com/photo/2017/08/06/12/05/people-2591868_960_720.jpg",
		"https://cdn.pixabay.com/photo/2017/08/06/12/58/people-2592299_960_720.jpg",
		"https://cdn.pixabay.com/photo/2019/01/30/10/27/girl-3964270_960_720.jpg"
	],
	"createdDate": "17/08/2019"
}

** WORK TODO
+ Convert error message to json.
+ Apply Swagger
+ Upload to host.

CREATE TABLE IF NOT EXISTS `user` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  role varchar(255) NOT NULL,
  workPlace varchar(255) NOT NULL,
  city varchar(255) NOT NULL,
  createdDate timestamp NOT NULL,
  onboardedDate timestamp NOT NULL,
  status BOOLEAN DEFAULT false,
  isDeleted BOOLEAN DEFAULT false,
  password varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

