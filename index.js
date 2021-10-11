const express = require('express');
const app = express();
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const methodOverride = require('method-override')

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())
// so we can use put delete and friends
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
	{
		id: uuidv4(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
	{
		id: uuidv4(), 
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
	{
		id: uuidv4(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
	{
		id: uuidv4(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]
// get all the comments and passing the data to ejs
app.get('/comments', (req, res) => {
	res.render('comments/index', {comments})
})
// go into the form page
app.get('/comments/new', (req, res) => {
	res.render('comments/new');
})
// send a post request to update our comments list
app.post('/comments', (req, res) => {
	const { username, comment } = req.body
	comments.push({username, comment, id: uuidv4()})
	res.redirect('/comments');
})
// get a specific comment
app.get('/comments/:id', (req, res) => {
	const { id } = req.params;
	// checking whether there is the id or not
	const comment = comments.find(c => c.id === id)
	res.render('comments/show', {comment})
})
// move to edit commment page
app.get('/comments/:id/edit', (req, res) => {
	const { id } = req.params;
	const comment = comments.find(c => c.id === id)
	res.render('comments/edit', {comment})
})
// update a specific comment and only the comment
app.patch('/comments/:id', (req, res) => {
	const { id } = req.params;
	const newCommentText = req.body.comment
	const foundComment = comments.find(c => c.id === id);
	foundComment.comment = newCommentText;
	res.redirect('/comments')
})
// deleting a comment
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})
// app.get('/tacos', (req, res) => {
// 	res.send('GET /tacos response');
// });

// app.post('/tacos', (req, res) => {
// 	const { meat, qty } = req.body;
// 	res.send(`OK, here are you ${qty} ${meat} taco`);
// });

app.listen(8080, () => {
	console.log('ON PORT 8080');
});

