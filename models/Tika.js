
const mongoose = require('mongoose');

const tikaSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tikaMessage: { type: String, required: true },
    tikaDate: { type: Date, default: Date.now },
    blessings: { type: String, required: true }
});

module.exports = mongoose.model('Tika', tikaSchema);
