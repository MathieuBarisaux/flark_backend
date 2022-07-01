[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)

<br/>
<div align="center">
    <img src="https://res.cloudinary.com/vintedcopy/image/upload/v1656507980/Flark/logo_s812um.png" width="590">
</div>
<div align="center">
    <p>Test it => <a href="https://flark.netlify.app/">HERE</a></p>
</div>
<br/>

# About Flark

<br/>
<div align="center">
    <img src="https://res.cloudinary.com/vintedcopy/image/upload/v1656508883/Flark/Capture_d_e%CC%81cran_2022-06-29_a%CC%80_15.21.10_lwfyu9.png" width="956">
</div>
<br/>

## Welcome to Flark !

Flark is an application based on Eisenhower matrice to manage your tasks and priorities.

Create your account, create and custom the categories you need and... create and manage your tasks with different priority levels.

In short, you can now change the world without being overwhelmed !

Your can check the Help Center to watch tutorials and contact me easily.

## Built with :

To create Flark backend, i use :

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/fr/)
- [Express-formidable](https://www.npmjs.com/package/express-formidable)
- [Cloudinary](https://cloudinary.com/)
- [MongoDB](https://www.mongodb.com/fr-fr)
- [Mongoose](https://mongoosejs.com/)
- [Mailgun](https://www.mailgun.com/fr/)
- [Crypto-js](https://www.npmjs.com/package/crypto-js)

<br/>

## Getting Started

### Prerequisites

<br/>

- Clone this repository :

  ```sh
  git clone https://github.com/MathieuBarisaux/flark_backend
  ```

- Install dependencies with npm :

  ```sh
  npm install
  ```

<br/>

### Environements variables

To use this projet, you need add this variables in your .env file :

`PORT`= Port for server (ex : 3000)

`MONGODB_URI`= MongoDB adress for your database

`CLOUD_NAME`= Cloudinary cloud name

`API_KEY`= Cloudinary api key

`API_SECRET`= Cloudinary secret api key

`API_KEY_MAILGUN`= Mailgun api key

`DOMAIN_MAILGUN`= Mailgun domain

<br/>

## API references

### User

Route for CRUD user :

| HTTP method | route                  | Variables                                        | action                                                                                |
| :---------- | :--------------------- | :----------------------------------------------- | :------------------------------------------------------------------------------------ |
| post        | /users/signup          | pseudo, password, email                          | return \_id, pseudo, email for localStorage and token for cookies                     |
| post        | /users/signin          | password, email                                  | return \_id, pseudo, email, newsletter, avatar for localStorage and token for cookies |
| put         | /users/update          | userPicture or email or newsletter + bearerToken | Update user information and return pseudo, email, newsletter, avatar for localStorage |
| put         | /users/update-password | password && newPassword + bearerToken            | Change user hash, salt and token user and return token for cookies                    |
| delete      | /users/delete          | bearerToken                                      | Delete user account and delete all categories, todos and notes of this user           |

### Categories

Route for CRUD category :

| HTTP method | route            | Variables                                                                      | action                       |
| :---------- | :--------------- | :----------------------------------------------------------------------------- | :--------------------------- |
| get         | /category/read   | Bearer token                                                                   | Return all user's categories |
| post        | /category/create | category_name, category_color, category_icon + Bearer token                    | Create new category          |
| put         | /category/update | category_id && category_name or category_color or category_icon + Bearer token | Update category              |
| delete      | /category/delete | category_id + Bearer token                                                     | Delete category              |

### Todo

Route for CRUD todo :

| HTTP method | route        | Variables                                                             | action                  |
| :---------- | :----------- | :-------------------------------------------------------------------- | :---------------------- |
| get         | /todo/read   | Bearer token                                                          | Return all user's todos |
| post        | /todo/create | content, urgent, important, categories, deadline + Bearer token       | Create new todo         |
| put         | /todo/update | todoID && content or achivement or urgent or important + Bearer token | Update todo             |
| delete      | /todo/delete | todoID + Bearer token                                                 | Delete todo             |

### Note

Route for CRUD note :

| HTTP method | route            | Variables                           | action                  |
| :---------- | :--------------- | :---------------------------------- | :---------------------- |
| get         | /note/read       | Bearer token                        | Return all user's notes |
| post        | /note/create     | content + Bearer token              | Create new note         |
| put         | /note/update     | noteId && updateText + Bearer token | Update note             |
| delete      | /note/delete-one | noteId + Bearer token               | Delete note             |

### Contact

Route for send message with mailgun :

| HTTP method | route    | Variables                              | action                 |
| :---------- | :------- | :------------------------------------- | :--------------------- |
| post        | /contact | userMessage, userObject + Bearer token | Send mail with mailgun |

## Developer

Mathieu Barisaux - [Linkedin](https://www.linkedin.com/in/mathieu-barisaux-2b800212a/) - mathieu.barisaux@gmail.com
