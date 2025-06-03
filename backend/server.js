const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongoURI = "mongodb+srv://emanoelsp:em23mano12@cluster0.ewuzq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const User = mongoose.model('User', userSchema);

app.get('/usuarios', async (req, res) => {
    const usuarios = await User.find();
    res.json(usuarios);
})

app.post('/usuarios', async (req, res) => {
    const { name, email, message } = req.body;
    const newUser = new User({ name, email, message });
    await newUser.save();
    res.status(201).json(newUser);
});

app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).send();
});

app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, message } = req.body;
    const updatedUser = await User.findByIdAndUpdate
        (id, { name, email, message }, { new: true });
    res.json(updatedUser);
});











