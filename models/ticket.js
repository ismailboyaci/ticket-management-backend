const mongoose = require('mongoose');
const TicketSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: false,
        trim: true,
    },
    tckn: {
        type: String,
        required: true,
        trim: true,
        length: 11,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        trim: true,
        default: '1',
    },
    attachments: {
        type: Array,
        required: false,
    },
    solutions: {
        type: Array,
        required: false,
    },
    lastreply: {
        type: String,
        required: false,
        trim: true,
    }
});

module.exports = mongoose.model("Ticket", TicketSchema);