import mongoose from "mongoose";

const ticketCollection = "ticket"

let today = new Date()

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    purchase_datetime:{
        type: Date,
        default: today.toLocaleString()
    },
    amount: {
        type: Number,
        default: 1
    },
    purchaser:{
        type : Schema.Types.ObjectId,
        ref:"users",
    }
})

const ticketModel = mongoose.model(ticketCollection, ticketSchema)

export default ticketModel