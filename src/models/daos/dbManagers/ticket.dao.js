import ticketModel from "../../schemas/ticket.js";

class TicketDAO{
    constructor(){

    }

    getTicket = async(code) => {
        const ticket = await ticketModel.findOne({code: code});
        return ticket
    }

    createTicket = async(email, amount, code) => {
        const ticket = {
            code: code,
            amount: amount,
            purchaser: email
        }

        const existsTicket = this.getTicket(code)
        if(ticket) return error

        try {
            let result = await ticketModel.create(ticket)
            return result
        } catch (error) {
            console.log(error);
        }
    }
}

export default new TicketDAO()