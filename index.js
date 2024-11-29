import express from "express";
const app = express()

import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
//const uri ="mongodb://127.0.0.1:27017"
const uri ="mongodb+srv://kuhumgupta:mC0VyobYeIskHwoe@cluster0.f9652.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri)
const db =client.db("ecomm")
app.use(express.json());
app.use(cors());

app.listen(8080, ()=>{
    console.log("Server started at port 8080")
})

app.get("/", async (req,res)=>{
    const items = await db.collection("Products").find().toArray() //this data is captured in frontend variable response
    res.status(200).json(items); //items is array of objects in mongo extracted using nodejs
});

app.post("/", async (req, res) => {
    const { name, price, desc, url } = req.body;
    const data = {
      name: name,
      price: price,
      desc: desc,
      url: url
    };
    const newProduct = await db.collection("Products").insertOne(data);
    res.status(200).json(newProduct);
  });
  
  
  app.delete("/:id", async (req, res) => {
      const id = req.params.id;
      const newProduct = await db.collection("Products").deleteOne({_id:new ObjectId(id)});
      res.status(200).json(newProduct);
    });  

app.get("/home", (req,res)=>{
    res.send("This is home api")
})

app.get("/", (req,res)=>{
    let products = [
        {
            "name":"Product 1",
            "price":34
        }
    ]
    //let products = get list from mongodb

    res.json(products)
})

app.get("/customers", (req,res)=>{
    let customers = [
        {
            "name":"Kuhu",
            "email":"kuhumgupta@gmail.com",
            "city":"Gurugram, Haryana"
        }
    ]
    res.json(customers)
})