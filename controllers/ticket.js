const TicketSchema = require('../models/ticket');

const createTicket = async (req, res) => {
    try {
        const newTicket = await TicketSchema.create(req.body);
        res.status(201).json({message: 'Ticket created successfully', data: newTicket});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const getTickets = async (req, res) => {
    try {
        const { page = 1, pageSize = 10, status, subject } = req.query;
        const query = {};
        if (status) {
            query.status = status;
        }
        if (subject) {
            query.subject = subject;
        }
        const skip = (page - 1) * pageSize;
        const limit = parseInt(pageSize);
        const tickets = await TicketSchema.find(query)
        .skip(skip)
        .limit(limit);
        res.status(200).json({message: 'Tickets fetched successfully', data: tickets});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const getTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await TicketSchema.findById(id);
        res.status(200).json({message: 'Ticket fetched successfully', data: ticket});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        req.body.updatedAt = Date.now();
        const updateTicket = await TicketSchema.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({message: 'Ticket updated successfully', data: updateTicket});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        await TicketSchema.findByIdAndDelete(id);
        res.status(200).json({message: 'Ticket deleted successfully'});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports = {createTicket, getTickets, getTicketById, updateTicket, deleteTicket};

