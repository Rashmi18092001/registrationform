const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/user");
const AdminModel = require("./models/admin");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/numetry", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB database connection established successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.post('/register', (req, res) => {
    console.log('Request Body:', req.body); // Log the request body for debugging
    const { email, name, username, password } = req.body;

    if (!email || !name || !username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const emailDomain = email.split('@')[1];
    const allowedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com'];

    if (allowedDomains.includes(emailDomain)) {
        UserModel.create(req.body)
            .then(user => res.status(201).json({ message: 'User registered successfully', user }))
            .catch(err => res.status(500).json({ error: 'User registration failed', details: err }));
    } else {
        AdminModel.create(req.body)
            .then(admin => res.status(201).json({ message: 'Admin registered successfully', admin }))
            .catch(err => res.status(500).json({ error: 'Admin registration failed', details: err }));
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await UserModel.findOne({ username });
        if (user) {
            if (user.password === password) {
                return res.json({ status: "Success", userType: "user" });
            } else {
                return res.json({ status: "the password is incorrect" });
            }
        }

        user = await AdminModel.findOne({ username });
        if (user) {
            if (user.password === password) {
                return res.json({ status: "Success", userType: "admin" });
            } else {
                return res.json({ status: "the password is incorrect" });
            }
        }

        return res.json({ status: "No record existed" });
    } catch (err) {
        return res.status(400).json(err);
    }
});

// New endpoint to get all users
app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users', details: err });
    }
});

// Get all admins
app.get('/admins', async (req, res) => {
    try {
        const admins = await AdminModel.find();
        res.json(admins);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch admins', details: err });
    }
});

app.listen(8082, () => {
    console.log("server is running on port 8082");
});
