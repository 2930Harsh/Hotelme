const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: String,
    description:String,
    image:{
        type:String,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fbackground&psig=AOvVaw0n8e-JMyyG4LJUNVO4Kg6z&ust=1708690792873000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCPjsx7f3voQDFQAAAAAdAAAAABAF",
    },
    price: Number,
    location: String,
    country: String,
})

const Listing = mongoose.model("Listing",schema);

module.exports = Listing
