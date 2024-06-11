const mongoose=require("mongoose")

const User=mongoose.Schema({
    username:String,
    password:String
})
const Ticket=mongoose.Schema({
    clientname:String,
    ticketstatus:String,
    ticketdescription:String
})
module.exports=
{User:mongoose.model("admindata",User),
Ticket:mongoose.model('ticketdata',Ticket)
}
