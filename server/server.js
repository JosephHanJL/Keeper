const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser'); 
const {MongoClient} = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
app.use(cors()); 
app.use(bodyParser.json());
const uri = 'mongodb+srv://jihan:GsfcvP8m@final.s9bt10i.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri);  
const db = client.db("keeper");
async function main(){
    try {
        await client.connect();
        app.listen(3000,()=>{console.log("server started on port 3000")});
    } catch (e) {
        console.error(e);
    }
}

app.get("/api", async (req, res) =>{
    const data = await db.collection("notes").find().toArray();
    console.log(data);
    res.send(data);
});
app.post("/api/postData", async (req, res) => {
    console.log("req received");
    const data = req?.body;
    console.log(data);
    const result = await db.collection("notes").insertOne(data);
    res.send(result);
})
app.delete('/api/deleteData/:id', async (req, res) => {
    const id = req.params.id.toString();
    console.log(id)
  
    try {
      const result = await db.collection('notes').deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Record deleted successfully' });
      } else {
        res.status(404).json({ message: 'Record not found' });
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
main().catch(console.error);