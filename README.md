# reSource

### Midterm Project by Mitch Aldrich, Shivani Konuguru, Kleir Miranda
  
  reSource is a full stack web application built using Node, Express, jQuery, SASS, and PostgreSQL for DBMS.


## What is reSource

reSource allows learners to save learning resources like tutorials, blogs and videos in a central place that is publicly available to any user.

- Users can save an external URL along with a title and description
- Users can search for already-saved resources created by any user
- Users can categorize any resource under a topic
- Users can comment on any resource
- Users can rate any resource
- Users can like any resource
- Users can view all their own and all liked resources on one page ("My resources")
- Users can register, log in, and log out.


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- EJS
- body-parser
- chalk
- cookie-session
- dotenv
- ejs
- express
- moment
- morgan
- node-sass-middleware
- pg
- pg-native
- timeago.js


## Final Product

!["Expanded resource page"](https://github.com/MitchWAldrich/Resource-Wall/blob/master/screenshots/expanded-resource-page.png?raw=true)

!["My resources page"](https://github.com/MitchWAldrich/Resource-Wall/blob/master/screenshots/my-resources-page.png?raw=true)

!["Search results page - Category: Education"](https://github.com/MitchWAldrich/Resource-Wall/blob/master/screenshots/search-results.png?raw=true)

!["Create page"](https://github.com/MitchWAldrich/Resource-Wall/blob/master/screenshots/create-form.gif?raw=true)

