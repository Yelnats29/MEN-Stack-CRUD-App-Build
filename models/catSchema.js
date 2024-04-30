const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    breed: String,
    color: String,
    weight: String,
    gender: String,
    fixed: Boolean,
    description: String,
});

const Cat = mongoose.model('Cat', catSchema);
module.exports = Cat;