let express = require('express');
let router = express.Router();
let controller = require('../controllers/controller');
const verifyAndAuthorize = require('../middleware/jwt-verify-authorize');
const {updateCycleProgram} = require('../models/cycle')

// GET users handler
router.get('/users', (req,res) =>{
    // res.render('index.html')
    controller.getAllUsers(req, res);
});

// SignUp handler
router.post('/signup', controller.signUp);

// SignIn handler
router.post('/signin', controller.signIn);

// Sample protected route
router.put('/update-program/:userId/:cycleId', verifyAndAuthorize, (req, res) => {
    const userIdFromToken = req.userId;
    const userIdFromPath = req.params.userId;
    const cycleIdFromPath = req.params.cycleId;


    if (userIdFromPath !== userIdFromToken) {
        return res.status(403).json({ message: 'Not authorized to update progress'})
    }

    const updatedProgram = req.body.program;
    if (!updatedProgram) {
        return res.status(400).json({ message: 'Program data missing from request.' });
    }

    updateCycleProgram(userIdFromPath, cycleIdFromPath, updatedProgram, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Program updated successfully.' });
    });

    // if IDs match, process with updating
});

module.exports = router; 
