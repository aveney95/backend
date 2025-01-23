const express = require('express');
const app = express();
const items = [];

//middleware
app.use(express.json());

//create(post)
app.post('/items', (req, res) => {
    const item = req.body;
    items.push(item);
    res.status(201).send('Item added to cart');
})

//read(get)
app.get('/items', (req, res) =>{
    res.json(items)
;})

//update(put)
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedItem = req.body;
    items[id] = updatedItem;
    res.send('Item updated');
})

//Delete
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    items.splice(id, 1);
    res.send('Item deleted');
})

app.listen(3000, () => {
    console.log('Server is runnin on port 3000')
})