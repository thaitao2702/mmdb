<h1 align="center">A simplified IMDb clone built with React and Node</h1>

![App screenshot](https://i.imgur.com/7UPrqmd.jpg)

## Features

- Admin control panel 
- Admin account allowed to add new movie to database, edit movie, view all movie list
- Sign up new user account, login 
- User account allowed to add movie to watch list, rate movie

## Setting up development environment 🛠

- Install [postgreSQL](https://www.postgresql.org/) and create a database named `mmdb`.
- git clone `https://github.com/thaitao2702/mmdb.git`
- Create an empty `.env` file in `/api`, copy `/api/.env.example` contents into it, and fill in your database username, password, admin account email and password to login to control panel.
- `cd api && npm install` install api dependency
- `cd api && npm run crawl` to crawl movies data, it will crawl a list of 100 movies
- `npm start`
- `cd client && npm install` install client dependency in another terminal
- `npm start`
- App should now be running on `http://localhost:8080/`
- You can login to control panel using admin email and password

