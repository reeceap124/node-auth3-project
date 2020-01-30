const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Users = require('../data/helpers/users-model')
const {jwtSecret} = require('../config/secrets')



router.post('/register', (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash

    Users.add(user)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(()=>{
            res.status(500).json({message: 'failed to add new user'})
        })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({username})
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = signToken(user)
                res.status(200).json({token})

            } else {
                res.status(401).json({message: 'invalid credentials'})
            }
        })
        .catch(()=>{
            res.status(500).json({message: 'failed to log you in'})
        })
})

function signToken(user) {
    const payload = {
        userId: user.id,
        username: user.username
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, jwtSecret, options)
}

module.exports = router