const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/QuizApp', (err) => {
    if (!err)
        console.log('MongoDB Connection Succeeded.');
});

module.exports = mongoose;
module.exports = {
    secret: 'yoursecret'
}