const express = require('express')

const cors = require('cors')

const mongoose = require('mongoose')

const User = require('./Models/UserSchema')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/interview')
.then(() => console.log('mongoDB connect Successfully'))
.catch(err => console.log(err))

const PORT = process.env.PORT || 5000


app.post("/login",async(req,res)  => {
    const {username,password} = req.body

    try{

        const user = await User.findOne({username})

        if(!user){
           return res.status(401).json('User does not exist')
        }
        if(user.password !== password){
           return res.status(401).json('invalid password')

        }
        else{
            return res.status(200).json('login successfully')
        }

    }
    catch(err){

        res.status(500).json('Server error');


    }
})


app.post('/',async(req,res) => {
    const {name,address, gender, username, password} = req.body

    try{
        let user = await User.findOne({username})

        if(user){
            return res.status(401).json('username already exist')
        }
        else{
            user = new User({
                name,
                address,
                gender,
                username,
                password

            })
            await user.save()
            return res.status(200).json('user create successfully')
            
        }
    }
    catch(err){
        res.status(500).json('Server error');


    }
})


app.listen(PORT,() => {
    console.log('Server running on the port ' + PORT);
})