const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: Number, default: 1 }, // 0 - admin, 1-user
    favorite: {type: Array}, 
    img: { type: String },
    date: { type: Date, default: new Date() },
    rating: {type: Number, default: 0}
});

module.exports = mongoose.model('User', UserSchema);
