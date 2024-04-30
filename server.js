const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const express = require('express');
const Cat = require('./model/catSchema.js');

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));

mongoose.connect(process.env.MONGODB_URI);

app.listen(3000, (req, res) => {
    console.log('Working fine!');
});

app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/cats', async (req, res) => {
    const catList = await Cat.find();
    res.render('cats/catList.ejs', {
        cats: catList,
    });
});

app.get('/cats/new', (req, res) => {
    res.render('cats/new.ejs');
});

app.post('/cats', async (req, res) => {
    if (req.body.fixed === 'on') {
        req.body.fixed = true;
    } else {
        req.body.fixed = false;
    }

    await Cat.create(req.body);
    res.redirect('/cats');
})

app.get('/cats/:catId', async (req, res) => {
    const selectedCat = await Cat.findById(req.params.catId);
    res.render('cats/show.ejs', {
        clickedCat: selectedCat,
    });
});

app.get('/cats/:catId/edit', async (req, res) => {
    const selectedCat = await Cat.findById(req.params.catId);
    res.render('cats/edit.ejs', {
        clickedCat: selectedCat,
    });
});

app.put('/cats/:catId', async (req, res) => {
    if (req.body.fixed === 'on') {
        req.body.fixed = true;
    } else {
        req.body.fixed = false;
    }

    await Cat.findByIdAndUpdate(req.params.catId, req.body);
    res.redirect('/cats')
});

app.delete('/cats/:catId', async (req, res) => {
    await Cat.findByIdAndDelete(req.params.catId);
    res.redirect('/cats');
})