import { HTTP_STATUS, HttpError } from "../../utils/responses.js";
import ticketDao from "../daos/dbManagers/ticket.dao.js"; 

class TicketRepository{
    async createTicket(email, amount, code){
        try {
            return await ticketDao.createTicket(email, amount, code)
        } catch (error) {
            const ticket = await ticketDao.getTicket(code)
            if(ticket) throw new HttpError("Ya existe un ticket con ese codigo", HTTP_STATUS.BAD_REQUEST)

            if(!email || !amount || !code){
                throw new HttpError("Faltan datos", HTTP_STATUS.BAD_REQUEST)
            }

            throw new HttpError("Error al finalizar la compra", HTTP_STATUS.SERVER_ERROR)
        }
    }

    async getTickets(){
        return await ticketDao.getTickets()
    }
}

export default new TicketRepository()