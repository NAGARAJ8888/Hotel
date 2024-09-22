const express = require('express');
const router = express.Router();

const Person = require('../model/Person');

//CREATE FUNCTION
router.post('/', async (req, res) => {
    try {
        const data = req.body; //take the data

        const newPerson = new Person(data); //create a object & insert the data

        // Save the new person to the database using await ( Save the Data )
        const savedPerson = await newPerson.save();

        console.log('Saved person to database');
        res.status(201).json(savedPerson);
    } 
    catch (error) {
        console.error('Error saving person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//READ FUNCTION
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//SEARCH BY ID FUNCTION
router.get('/:workType', async(req, res) => {
    try {
        const workType = req.params.workType;//Extract the work type from URL parameter
        if(workType =='chef' || workType == 'manager' || workType == "waiter")
        {
            const response = await Person.find({work: workType});//finding the same in person objects
            console.log('response fetched');
            res.status(200).json(response); 
        }
        else{
            res.status(404).json({ error: 'Invalid work type'})
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//UPDATE FUNCTION
router.put('/:id', async (req, res) => {
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new : true,             //validate before 
            runValidators : true,   //validate after update
        })

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
})


//DELETE FUNCTION
router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id;  // take the parameter Id
        const PersonData = req.body;

        const response = await Person.findByIdAndDelete(personId, PersonData);

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data deleted');
        res.status(200).json(response);
    }
    catch(err){
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
});

module.exports = router;