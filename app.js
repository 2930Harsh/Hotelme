const express = require('express');
const mongoose = require("mongoose");
const Listing = require('./models/listing');
const path = require("path");
const methodOverride=require("method-override");
const app = express();
const ejsMate=require("ejs-mate");
const dotenv = require('dotenv').config({path : './config/config.env'});
const DB_URI = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.wwq6tk9.mongodb.net/`

const fun = async () => {
    await mongoose.connect(DB_URI);
}

fun().then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
})

app.set("view engine",'ejs');
app.set('views',path.join(__dirname , "views"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.get("/listings", async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
})

app.get("/listings/new",async(req,res)=>{
    res.render("listings/newListing.ejs");
})

app.get("/listings/:id",async(req,res)=>{
    const listing = await Listing.findById(req.params.id);
    res.render("listings/show.ejs",{listing});
})

app.post("/listings" , async(req,res)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
})

app.get("/listings/:id/edit",async(req,res)=>{
    const {id}=req.params;
    // console.log(id);
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})
app.put("/listings/:id",async(req,res)=>{
    const listing=req.body.listing;
    const {id}=req.params;
    console.log(id);
    console.log(listing);
    await Listing.findByIdAndUpdate(id,listing);
    res.redirect(`/listings/${id}`);
})
app.delete("/listings/:id",async(req,res)=>{
    console.log("Hi");
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})
app.get("/testListings",async (req,res)=>{
    res.send("saved ");
})

app.get("/",(req,res)=>{
    res.send("Hi");
})

app.listen(8000,()=>{
    console.log("Server is working on port number 8000");
})



// mongoose.connect()