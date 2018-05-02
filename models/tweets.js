const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetsSchema = new Schema({
    content: { type: String, required: true },
    imageUrl: String,
    author: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    createdAt: { type: Date, required: true, default: Date.now }
});

const Tweets = mongoose.model('Tweets', TweetsSchema);

module.exports = Tweets;