const router = require("express").Router();
const User = require("../model/user.js");
const bcrypt = require("bcryptjs");

// sign up
router.post("/register", async(req,res) =>{
    try{
        const {email, username, password} = req.body;
        const hashPassword = bcrypt.hashSync(password);
        const user = new User({email, username, password:hashPassword});
        await user.save().then(()=> res.status(200).json({message: "Sign Up Successfull"}));
    } catch(error){
        res.status(200).json({message: "User already exists"});
    }
});

// sign in
router.post("/signin", async(req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(400).json({message: "Please sign up first"});
        }

        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password, user.password
        );
        if(!isPasswordCorrect){
            res.status(400).json({message: "Password is not correct"});
        }

        const{ password, ...others} = user._doc;
        res.status(200).json({others});
    } catch(error){
        res.status(400).json({message:"Wrong Credentials"});
    }   
})

module.exports = router;