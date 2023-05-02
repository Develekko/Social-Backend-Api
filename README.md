
<div align="center">
<h1>Social-Backend-Api</h1>

![image](https://i.imgur.com/ZKXUbGG.png)
</div>

## 🏃‍♂️ Quick Start
- [Description!](https://github.com/Develekko/Social-Backend-Api#-description)
- [Technologies!](https://github.com/Develekko/Social-Backend-Api#-technologies)
- [Features!](https://github.com/Develekko/Social-Backend-Api#-features)
- [Prerequisites!](https://github.com/Develekko/Social-Backend-Api#-prerequisites)
- [Installation!](https://github.com/Develekko/Social-Backend-Api#%EF%B8%8F-installation)
- [API Documentation!](https://github.com/Develekko/Social-Backend-Api#-api-documentation)
- [Deployment!](https://github.com/Develekko/Social-Backend-Api#-deployment)
- [Contribute!](https://github.com/Develekko/Social-Backend-Api#-contribute)
- [Author!](https://github.com/Develekko/Social-Backend-Api#-author)
- [Licence!](https://github.com/Develekko/Social-Backend-Api#-licence)

## 📝 Description

This is the backend API for a social media application that provides a range of powerful features to users.  API is designed to provide a seamless and efficient experience, allowing users to interact with the app in meaningful ways.

## 💻 Technologies

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [Express-favicon](https://www.npmjs.com/package/express-favicon)
- [Nodemon](https://nodemon.io)
- [Node Schedule](https://www.npmjs.com/package/node-schedule)
- [joi](https://joi.dev)
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- [jwt](https://jwt.io)
- [Nano ID](https://www.npmjs.com/package/nanoid)
- [Nodemailer](https://nodemailer.com)
- [otp-generator](https://www.npmjs.com/package/otp-generator)
- [multer](https://www.npmjs.com/package/multer)
- [mongoose](https://mongoosejs.com)
- [moment](https://momentjs.com)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [qrcode](https://www.npmjs.com/package/qrcode)
- [cors](https://www.npmjs.com/package/cors)
- [cloudinary](https://cloudinary.com)
- [axios](https://axios-http.com)
- [ua-parser-js](https://www.npmjs.com/package/ua-parser-js)

## 🎉 Features

<h4>1- Authentication and Authorization: </h4>

- Handeling Register , Login , Logout
- Confirmation email via Gmail
- Forget & Reset Password

<h4>2- User Profile Management: </h4>

- user connections ( Get All List ,Get Mutal, Request , Accept , Remove)
- user profile & other's profile
- update user info
- Delete Account 
- recover Account ( 30 day max ) throuh email sent after deleting

<h4>3- Admin Management: </h4>

- Users List / online
- Block / un Block users

<h4>4- Post Management: </h4>

- Crud Posts (soft delete applied)
- Linkedin reactions simulator  ![image](https://static.licdn.com/sc/h/b4vbnu63fjnrjyuqemaajt06l) ![image](https://static.licdn.com/sc/h/528m9da0ski0hytdrx3o8vfau) ![image](https://static.licdn.com/sc/h/9zeq0nwqbbsfwwfuveskhr7sd) ![image](https://static.licdn.com/sc/h/e3j8tb0bp0xcj5dccu9od4ywf) ![image](https://static.licdn.com/sc/h/67zjrz4y0ylyvrzui6kbmnt8h) ![image](https://static.licdn.com/sc/h/ktcgulanbxpl0foz1uckibdl)

<h4>5- Comment Management: </h4>

- Crud Comments (soft delete applied)

<h4>6- Reply Management: </h4>

- Crud Reply (soft delete applied)




## 📋 Prerequisites
Before you begin, make sure that you have the following tools and technologies installed on your machine:
- [Node.js](https://nodejs.org/en/download)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/downloads)
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/download), [Atom](https://atom.en.uptodown.com/windows), or [Sublime Text](https://www.sublimetext.com/3)
- [Postman](https://www.postman.com/downloads) for API Documentation


## ⚙️ Installation
To install and run your social media backend API, follow these steps:

<h2>1. Clone the repository</h2>

```
git clone https://github.com/Develekko/Social-Backend-Api.git
cd Social-Backend-Api
```

<h2>2. Install dependencies</h2>

```
npm install

```
<h2>3. Set up environment variables</h2>

> Note: **environment variables(.env) located into config file**

```
PORT=<Your_PORT_Number>
DB_URL=<mongodb_url>
BARER_KEY=<BEARER>
TOKEN_SIGNATURE=<SIGNATURE>
CONFIRM_EMAIL_SIGNAUTRE=<SIGNATURE>
SALT_ROUNDS=<SALT_ROUNDS>
GMAIL_EMAIL=<GMAIL_EMAIL>
GMAIL_PASSWORD=<GMAIL_APP_PASSWORD>
CLOUDINARY_NAME=<CLOUDINARY_NAME>
CLOUDINARY_KEY=<CLOUDINARY_KEY>
CLOUDINARY_SECRET=<CLOUDINARY_SECRET>
INTERNET_INFO=https://ipgeolocation.abstractapi.com/v1/?api_key=<ABSTRACT_API_KEY>
```

- Replace `<Your_PORT_Number>` with the port number you want your server to listen on , for example (5000)
- Replace `<mongodb_url>` with your MongoDB Cloud URL
> Note: To get `MongoDB` the  Cloud URL, follow these steps through [URL](https://www.mongodb.com/docs/guides/atlas/connection-string)
- Replace `<BEARER>` with any secret key for example (**bearer_{Token}**)
- Replace `<SIGNATURE>` with any secret key for example (**UhzOXjiSgTWDZbXUSRnh**)
> Note: In JSON Web Tokens (JWT), the signature is a string of characters that is used to verify the authenticity of the token.
- Replace `<SALT_ROUNDS>` with number between 1-20
> Note: A commonly used hashing algorithm for password storage is bcrypt, and a minimum of 10 salt rounds is generally recommended.
However, some security experts recommend using a higher number of salt rounds
, such as 12 or 14, to provide additional security against brute-force attacks. [Read More...](https://medium.com/coinmonks/to-salt-or-not-to-salt-salting-is-not-the-only-answer-to-securing-passwords-cdab26bd20ad)
- Replace `<GMAIL_EMAIL>` with your Google Account
- Replace `<GMAIL_APP_PASSWORD>` with your Google App password
> Note: follow these steps : [URL](https://support.google.com/accounts/answer/185833?hl=en)
- Replace `<CLOUDINARY_NAME>`, `CLOUDINARY_KEY`,`CLOUDINARY_SECRET` with keys in your  [cloudinary](https://cloudinary.com) Account .  Follow these steps on this [URL](https://cloudinary.com/documentation/how_to_integrate_cloudinary#1_create_your_account_and_set_up_your_product_environment)
> ![image](https://i.imgur.com/9TndYUV.png)
- Replace `ABSTRACT_API_KEY` with  your own api key through [URL](https://www.abstractapi.com/api/ip-geolocation-api)

<h2>4. Start the server</h2>

```
nodemon [your node app]  or  nodemon
```
or
```
npm run dev
```



## 📖 API Documentation
The API documentation is provided through [Postman JSON File](./Social-Backend-Api.postman_collection.json)

<h3>Follow These Steps</h3>

  1. Click **Download raw file**
  
  ![image](https://i.imgur.com/s9pq1Z1.png)

  2. open **[Postman Desktop](https://www.postman.com/downloads)** or through **[Postman Browser](https://www.postman.com)**
  
  - Go to File -> import  or press **CTRL+O**
  
  ![image](https://i.imgur.com/dc2pDb8.png)     ![image](https://i.imgur.com/Q6qR6vl.png)
  
  3. You will find six main folders (`Auth`,`User`,`Admin`,`post`,`Comment`,`Reply`) , each folder contains an API requests. 
  
  ![image](https://i.imgur.com/Gl5LSFB.png) 
  
  
## 🚀 Deployment

>Before you begin, Make sure that you don't have any issues or errors before deploying your project.

>You need to remove `config` or `.env` file before deployment because of the sensitive data.

<h3>What do you need ?</h3>

1. Create a run script in the `package.json` file [Here](./package.json/#L9)

```json
"scripts": {
        "start": "node index.js"
    },
```

2. Add an "engines" section to your `package.json` file [Here](./package.json/#L12)

```json
"engines": {
  "node": "16.14.0"
},
```

>Note : To check the version of Node.js installed on your system, you can use the node -v command.

```
node -v
```

3. Create a `vercel.json` file and put it in the root of your project folder and then add the code below

```json
{
    "version": 2,
    "builds": [
       { "src": "./index.js", "use": "@vercel/node" }
    ],
    "routes": [
        {
          "src": "/(.*)",
          "dest": "/"
        }
      ]
 }
```

4. For our Deployment , we gonna use [vercel](https://vercel.com) 

>Note: Vercel is a cloud platform for building, deploying, and scaling web applications. It provides a seamless deployment experience for front-end frameworks like React, Angular, and Vue.js, as well as serverless functions and full-stack applications.

- Follow these steps from [Ada Cheng](https://dev.to/adafycheng/deploy-nodejs-application-to-vercel-in-5-minutes-171m#create-a-vercel-project) article 

- Once you reach here, **congratulations!** You deployed your project successfully.

![image](https://imgur.com/oHi60rJ.png)
  
- Finally, you need to do the last important thing: add environment variables to your project through these steps .

1- go to you project settings

![image](https://imgur.com/qzQ9qbb.png)

2- You can either add variables one by one,  copy and paste the whole file, or import your `.env` file [Read More](https://vercel.com/docs/concepts/projects/environment-variables).

3- After submitting your environment variables, you may need to redeploy your Vercel project. 

## 👍 Contribute
Leave a ⭐ If you think this project is cool.

## 👨‍💻 Author

Housam Ramadan


[![image](https://user-images.githubusercontent.com/52341115/235778729-5364162c-9b6e-4d43-aca7-c83eb087ad83.png)](https://www.linkedin.com/in/housamramadan)

## 🔓 Licence
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the LICENSE file for more information.
