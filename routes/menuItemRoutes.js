const express = require('express');
const router = express.Router();

const MenuItem = require('./../model/MenuItem');


router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const menu = new MenuItem(data);
        // Save the new menu to the database using await
        const savedMenu = await menu.save();
        console.log('Saved person to database');
        res.status(201).json(savedMenu);
    } 
    catch (error) {
        console.error('Error saving person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const menu = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(menu);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;