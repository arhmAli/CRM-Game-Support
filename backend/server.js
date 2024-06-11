const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const { User, Ticket } = require('./model');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Database connected"))
  .catch((e) => console.log(e));

app.post('/verify', async (req, res) => {
  const { admin, pass } = req.body;
  try {
    const user = await User.findOne({ user: admin, pass });
    if (user) {
      const message = "verified admin";
      res.status(200).json({ message });
    } else {
      res.status(400).json({ message: "Not verified" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
});

app.get('/clientinfo', async (req, res) => {
  try {
    const data = await Ticket.find();
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
});

app.post('/clientinfo', async (req, res) => {
  const { clientname, ticketstatus, ticketdescription } = req.body;
  try {
    const clientInfo = await Ticket.create({ clientname, ticketstatus, ticketdescription });
    res.status(201).json(clientInfo);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
});

app.delete('/clientinfo/:clientinfo', async (req, res) => {
  const { clientinfo } = req.params;
  try {
    const data = await Ticket.findOneAndDelete({ clientname: clientinfo });
    res.json({ message: "Deleted successfully", data });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
