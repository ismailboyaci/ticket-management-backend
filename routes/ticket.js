const express = require('express');
const router = express.Router();
const {createTicket, getTickets, getTicketById, updateTicket, deleteTicket} = require('../controllers/ticket');

router.post('/createTicket', createTicket);
router.get('/getTickets', getTickets);
router.get('/getTicketById/:id', getTicketById);
router.patch('/updateTicket/:id', updateTicket);
router.delete('/deleteTicket/:id', deleteTicket);

module.exports = router;
