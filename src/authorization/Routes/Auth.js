const express = require("express");
const users = require("../SchemasForAuth/userSchema");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const tech = process.env.SECRET;
const validate = require("../Middleware/Authenticate");;

//After login to display username for admin preference
router.get("/user",validate,async(req,res) => {
    return res.status(200).json({username:req.user.name});
})

// signup

router.post("/signup",async(req,res) => {
    try {
        const {username,password} = req.body;
        if(!username || !password){
            return res.status(400).json({msg:"Username and password are required."})
        }
        if(username.length < 3 || password.length < 5){
            return res.status(400).json({msg:"The name must be longer than 3 characters, and the password must be longer than 5 characters."})
        }
        const existingUser = await users.findOne({username});
        if(existingUser){
            return res.status(400).json({msg:"Username is already taken. Try another."});
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);
        const user = await users.create({
            username,
            password:hash
        });
        if(!user){
            return res.status(400).json({msg:"Failed to create!!"})
        }
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({msg:"Internal server error",error:error.message});
    }
});

// signin

router.post("/signin",async(req,res) => {
    try {
        const {username,password} = req.body;
        if(!username || !password){
            return res.status(400).json({msg:"Username and password are required."})
        }
        if(username.length < 3 || password.length < 5){
            return res.status(400).json({msg:"The name must be longer than 3 characters, and the password must be longer than 5 characters."})
        }
        const user = await users.findOne({username});
        if(!user){
            return res.status(400).json({msg:"No username available!"})
        }
        const success = await bcrypt.compare(password,user.password);
        if(!success){
            return res.status(400).json({msg:"Invalid credentials!!"});
        }
        const data = {
            user:{
                id:user.id,
                name:user.username
            }
        };
        const token = jwt.sign(data,tech);
        return res.status(200).json({authToken:token});
    } catch (error) {
        return res.status(500).json({msg:"Internal server error",error:error.message});
    }
});

module.exports = router;
