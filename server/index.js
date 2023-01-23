const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const authRoutes = require('./routes/auth');
const verifyToken = require('./routes/verifyToken');

app.get('/', (req, res) => {
    res.send('Welcome to the online authentication portal!');
})

app.get('/api/user/profile', verifyToken, (req, res) => {
    res.send({ success: true, data: req.user })
})
app.use('/api/users', authRoutes);

mongoose.connect('mongodb+srv://<INSERT DATABASE URL HERE>')
    .then(() => {
        app.listen(3000, () => console.log('Server is running'));
    })
    .catch(err=> console.log(err))

