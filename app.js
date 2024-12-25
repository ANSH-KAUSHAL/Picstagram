const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 4014;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Serve HTML and CSS outside the public folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve your HTML file
});

app.get('/index.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.css')); // Serve your CSS file
});

// User data
const users = [];

app.post('/submit', (req, res) => {
    console.log('Form Data Received:', req.body);

    let user_id;
    if (users.length === 0) {
        user_id = 1;
    } else {
        user_id = users[users.length - 1].id + 1;
    }

    const new_user = {
        id: user_id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        dob: req.body.dob,
        phone: req.body.phone,
        password: req.body.password
    };

    users.push(new_user);
    console.log(users);
    res.status(202).json({ message: "User Registered..." });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
