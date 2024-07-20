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
    const { email, password } = req.body;

    try {
        // Check if user exists in the UserModel collection
        let user = await UserModel.findOne({ email });
        if (user) {
            if (user.password === password) {
                // Update the lastLogin field for users
                user.lastLogin = new Date();  // Set the current date and time
                await user.save();  // Save the updated user document
                
                 // Log user data
                 console.log('User logged in:', {
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    lastLogin: user.lastLogin,
                    lastLogout: user.lastLogout
                });

                return res.json({ status: "Success", userType: "user" });
            } else {
                return res.json({ status: "the password is incorrect" });
            }
        }

        // Check if user exists in the AdminModel collection
        user = await AdminModel.findOne({ email });
        if (user) {
            if (user.password === password) {
                // No need to update the lastLogin field for admins
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

app.post('/logout', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ status: "Error", message: "Email is required" });
    }

    try {
        // Find the user by email and update the lastLogout field
        const user = await UserModel.findOneAndUpdate(
            { email },
            { lastLogout: new Date() },
            { new: true }
        );

        if (user) {
            // Log user data
            console.log('User logged out:', {
                name: user.name,
                email: user.email,
                username: user.username,
                lastLogin: user.lastLogin,
                lastLogout: user.lastLogout
            });

            return res.json({ status: "Success", message: "Logout time updated", user });
        } else {
            return res.json({ status: "User not found" });
        }
    } catch (err) {
        return res.status(500).json({ status: "Error", message: 'Failed to update logout time', details: err });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find({}, 'name email username lastLogin lastLogout'); // Include lastLogout field
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users', details: err });
    }
});

app.get('/admins', async (req, res) => {
    try {
        const admins = await AdminModel.find();
        res.json(admins);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch admins', details: err });
    }
});

app.get("/", (req, res) => {
    res.json("Hello");
})

app.listen(8082, () => {
    console.log("server is running on port 8082");
});
