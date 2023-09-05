import { HTTP_STATUS, HttpError } from "../../utils/responses.js"
import messagesDAO from "../daos/dbManagers/messages.dao.js"

class MessagesRepository{
    async getAllMessages(){
        try {
            return await messagesDAO.getAllMessages()
        } catch {
            throw new HttpError("Error al obtener los mensajes", HTTP_STATUS.BAD_REQUEST)
        }
    }

    async saveMessages(user, message){
        try {
            return await messagesDAO.saveMessages(user, message)
        } catch {
            if(!user || !message){
                throw new HttpError("Faltan datos", HTTP_STATUS.BAD_REQUEST)
            }
        }
    }
}

export default new MessagesRepository()