const mongoose = require("mongoose")
const {client , guildid} = require("../index")
let Schema = new mongoose.Schema({
    guildid:{
        type:String,
        default:guildid
    },
    id:{
        type:String,
    },
    points:{
        type:String,
        default:0,
    },
});
module.exports = mongoose.model('manager' , Schema)