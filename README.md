# Good Vibes 
## by Anna, Yassine, Tashbeeh and Atheer

Overview
This is a web app for making anonymous posts to a website. Users can add a single gif to their post and all posts can be reacted to through emojis. A comments section is included under each post for users to comment anonymously on each other's posts.

Processes
- Client side rendering that allows users to dynamically add posts to the webpage
- Previous post data is sent from the server to client and is rendered on page load
- Data is stored and transfered in JSON format
- The DOM is manipulated to create search fields, buttons, emojis, and gifs for the user to interact with

Getting started
1) Fork and clone this repository
2) Install dependencies as specified in the package.json file by typing npm intall in your terminal. 
3) Since the package.json file is in the "Server" folder ensure that you are in this folder before installing dependencies. For more info on using npm refer to https://github.com/npm
4) Run the server by typing "npm start" into your terminal, ensure you are in the "Server" folder.
5) Run tests by typing "npm test" into your terminal. Tests exist for both client and server side, so please ensure you are in the correct folder for the tests that you want to run.
6) If you are on windows, please do not use the Live Server (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension to view the "index.html" file as this triggers a page reload every time a button is pressed on the webpage

This project was made as part of the Futureproof (https://github.com/getfutureproof) software engineering bootcamp. This repository is no longer being maintained.
