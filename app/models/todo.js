//load mongoose to interact with Mongo
var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    text: String,
    done: Boolean
});
