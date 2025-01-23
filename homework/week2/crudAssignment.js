// Build a mini-project: Create a RESTful API with at least three resources and routes for each CRUD operation.
//comment
//make a server and endpoint, test with postman

const express = require('express')
const app = express()
const PORT = 3000

//middleware
app.use(express.json())

//variables to store data

let users = [];
let posts = [];
let comments = [];


//routes for users
app.get('/users', (req, res) => {
    console.log("get users hit")
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(user) res.json(user)
    else res.status(404).send('User not found')
})

app.get('/users:id', (req, res) => {
    console.log("user id hit")
    const user = users.find(u => u.id === parent(req.params.id))
    if(user) res.json(user);
    else res.status(404).send('User not found')
})

app.post('/users', (req,res) => {
    console.log('new user hit')
    const newUser = {id: users.length +1, ... req.body};
    users.push(newUser)
    res.status(201).json(newUser)
})

app.put('/users/:id', (req,res) => {
    console.log('find users hit')
    const user = users.find(u => u. id === parseInt(req.params.id))
    if(user){
        Object.assign(user, req.body);
        res.json(user)
    }else res.status(404).send('User not found')
})

app.delete('/users/:id', (req, res) => {
    console.log('delete user hit')
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1){
        users.splice(index, 1);
        res.status(204).send();
    } else res.status(404).send('User not found')
});

//routes for posts
app.get('/posts', (req, res) => {
    console.log('posts hit')
    res.json(posts)
})

app.get('/posts/:id', (req, res) => {
    console.log('post id hit')
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if(post) res.json(post)
    else res.status(404).send('post not found')
})

app.post('/posts', (req,res) => {
    console.log("new post hit")
    const newPost = {id: posts.length +1, ... req.body};
    posts.push(newPost)
    res.status(201).json(newPost)
})

app.put('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if(post) {
        Object.assign(post, req.body);
        res.json(post)
    }else res.status(404).send('post not found')
})

app.delete('/posts/:id', (req, res) => {
    console.log('delete posts hit')
    const index = posts.findIndex(p => p.id === parseInt(req.params.id));
    if(index !== -1) {
        posts.splice(index, 1);
        res.status(204).send();
    } else res.status(404).send('Post not found')
})

//routes for comments
app.get('/comments', (req, res) => {
    console.log('comments hit')
    res.json(comments);
})

app.get('/comments/:id', (req, res) => {
    console.log('find comments hit')
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if(comment) res.json(comment);
    else res.status(404).send('comment not found')
})

app.post('/comments', (req, res) => {
    console.log('new comment hit')
    const newComment = {id: comments.length + 1, ... req.body};
    comments.push(newComment);
    res.status(201).json(newComment)
})

app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if(comment) {
        Object.assign(comment, req.body);
        res.json(comment)
    } else res.status(404).send('comment not found')
})

app.delete('/comments/:id', (req, res) => {
    console.log('delete comments hit')
    const index = comments.findIndex(c => c.id === parseInt(req.params.id))
    if(index !== -1){
        comments.splice(index, 1);
        res.status(204).send();
    } else res.status(404).send('comment not found')
})

//start server
app.listen(PORT, () => {
    console.log('Server is running on port 3000')
})