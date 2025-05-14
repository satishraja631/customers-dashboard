import mongoose from 'mongoose'

const liveEventSchema=mongoose.Schema({
    store_id: Number,
    customers_in: Number,
    customers_out: Number,
    time_stamp: String,


},{timestamps:true})

export const LiveEvent=mongoose.model('LiveEvent',liveEventSchema)