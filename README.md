# Astronomica 🪐 - NASA APOD Infinite Feed With Authorization

## Introduction

This fullstack project made for better representation of [NASA APOD](https://apod.nasa.gov/apod/archivepixFull.html) API. **APOD** stands for Astronomy Picture Of the Day. Client (frontend) logic located in this repo - [nasa-apod-frontend](https://github.com/kr4chinin/nasa-apod-frontend). Try this app live via GitHub Pages [here](https://kr4chinin.github.io/nasa-apod-frontend/#/login).

Server deployed to [Heroku](https://dashboard.heroku.com), here is the [link](https://nasa-apod-project-backend.herokuapp.com).

### Functionality

* **JWT** authorization (token TTL is 1 hour), password encryption
* Data (username, password, favourite posts IDs) is stored in the non-relational database
* Client communicating with server via **REST APIs**
* Password and username **validation** (length, not empty etc.)

### Tech stack

* Javascript + NodeJS
* MongoDB + Mongoose
* Express, express-validator
* Jsonwebtoken (JWT)
* Bcrypt (for password salty hashing)
* Axios

This is how feed looks like, for more screenshots and information check [nasa-apod-frontend](https://github.com/kr4chinin/nasa-apod-frontend) **README**:

<img width="800" src="https://user-images.githubusercontent.com/103210607/180062987-d2805986-d1f0-4fd9-8a39-c52a11192bbe.png">


