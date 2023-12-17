const {model , Schema} = require('mongoose')

let userSchema = new Schema({
    server : String
})

module.exports = model("maker_guild" , userSchema)