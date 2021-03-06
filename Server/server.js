// ATHEER START //
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const fs = require('fs');  // Required to initialise JSON for backend
const { response } = require('express');

const server = express()
server.use(cors());
server.use(bodyParser.text());


// Initilise posts, an array of objects with {title: "", body:"", image:"", comments: []} from external JSON File. 
const data = fs.readFileSync('data.JSON');
const posts = JSON.parse(data);


server.get('/', (req, res) => {
    res.send('Hello');
})

// Write get request that will send posts object to cleint side
server.get('/posts', (req, res) => res.send(JSON.stringify(posts)));

// Route Parameters
server.get('/posts/:id', (req, res) => {
    const postTitle = req.params.id;
})

// Write post request that will add a users post to the posts variable and appends the JSON file
server.post('/posts', (req, res) => {
    const newPost = JSON.parse(req.body); 
    posts.push(newPost);
    let data = JSON.stringify(posts, null, 2);
    fs.writeFileSync('data.JSON', data) 
})

// Write get request for comments
server.get('/comments', (req, res) => res.send(JSON.stringify(posts)));

// Write post request that will add a comment to the comments variable and appends it to to the JSON file
server.post('/comments', (req, res) => {
    let newComment = req.body
    let i = newComment.slice(-2, -1);
    newComment = newComment.slice(1, -2);

    posts[i].comments.push(newComment);
    let data = JSON.stringify(posts, null, 2);
    fs.writeFileSync('data.JSON', data)
})

const port = process.env.PORT || 3000;
module.exports = server.listen(port, () => console.log(`We are live at http://localhost:${port}`));      

// module.exports = server;
// ATHEER END //