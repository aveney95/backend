//create a server
//create a dynamic route
//routes that are parameters
//routes that are query parameters
// use study guide
//console log the .listen method
const express = require('express');
const app = express();
const PORT = 3000;

//middleware
app.use(express.json())

//route for finding concert
app.get('/artists/:id', (req,res) => {
    console.log('find artists hit');
    const artistId = req.params.id;
    res.json({msg: `Artist ID received: ${artistId}`});
});

//route for finding concert and location
app.get('/artists/:artistId/venues/:venueId', (req,res) =>{
    console.log('venues hit')
    const {artistId, venueId} = req.params;
    res.json({msg: `Artist: ${artistId}, Venue: ${venueId}`})
})

//route to search for artist and location
app.get('/search', (req,res) => {
    console.log('search hit')
    const {artist, venues} = req.query;
    res.json({msg: `Searching for artist: ${artist}, Venue: ${venues}`})
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})