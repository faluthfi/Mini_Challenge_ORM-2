const express = require('express');
const app = express();
const { User } = require('./models');
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.json())

app.get('/users', (req, res) => {
    User.findAll()
        .then(user => {
            res.status(200).render('users', { user })
        })
});

app.get('/users/delete/:id', (req, res) => {
    User.destroy({ where: { id: req.params.id } }).then(() => { res.redirect('/users') })
});

app.post('/users', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
    })
        .then(article => {
            res.status(201).json(article)
        }).catch(err => {
            res.status(422).json("Can't create article")
        })
});

app.get('/users/update/:id', (req, res) => {
    User.findOne({ where: { id: req.params.id } })
        .then((user) => {
            res.render('update', { user });
        });
});

app.post('/users/update/:id', (req, res) => {
    User.update({
        username: req.body.username,
        password: req.body.password
    },
        { where: { id: req.params.id } }
    )
        .then(() => {
            res.redirect('/users');
        });
});


app.listen(port, (req, res) => {
    console.log(`Server Running on port ${port}`)
});