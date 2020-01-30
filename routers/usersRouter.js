const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Users = require('../data/helpers/users-model')
const restricted = require('../middleware/restricted')

router.get('/users', restricted, (req, res)=>{
    Users.find()
        .then(usersList=>{
            res.status(200).json(usersList)
        })
        .catch(()=>{
            res.status(500).json({message: 'failed to get users'})
        })
})



module.exports = router;