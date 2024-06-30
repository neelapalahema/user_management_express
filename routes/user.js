const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/users.json');

// Read users data from the JSON file
const getUsersData = () => {
    return fs.readJsonSync(dataFilePath, { throws: false }) || [];
};

// Write users data to the JSON file
const saveUsersData = (data) => {
    fs.writeJsonSync(dataFilePath, data, { spaces: 2 });
};

// GET /users - Retrieve all users
router.get('/', (req, res) => {
    const users = getUsersData();
    res.json(users);
});

// GET /users/:id - Retrieve a user by ID
router.get('/:id', (req, res) => {
    const users = getUsersData();
    const user = users.find(u => u.id === req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// POST /users - Create a new user
router.post('/', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).send('Name and Email are required');
    }
    const users = getUsersData();
    const newUser = {
        id: Date.now().toString(),
        ...req.body
    };
    users.push(newUser);
    saveUsersData(users);
    res.status(201).json(newUser);
});

// PUT /users/:id - Update a user by ID
router.put('/:id', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).send('Name and Email are required');
    }
    const users = getUsersData();
    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex !== -1) {
        users[userIndex] = { id: req.params.id, ...req.body };
        saveUsersData(users);
        res.json(users[userIndex]);
    } else {
        res.status(404).send('User not found');
    }
});

// DELETE /users/:id - Delete a user by ID
router.delete('/:id', (req, res) => {
    let users = getUsersData();
    users = users.filter(u => u.id !== req.params.id);
    saveUsersData(users);
    res.status(204).send();
});

module.exports = router;
