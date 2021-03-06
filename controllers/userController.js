require('dotenv').config()
// const  {User, create} = require('../models/UserModel');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const loadLoginPage = (req,res) => {
    res.render('login' ,{error});    
};
const loadRegisterPage =(req ,res) =>{
    res.render('register' ,{error_validation});
}

let error_validation ="";
const validation_register = (req ,res)=>{
    
    const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (req.body.username.length < 6 ||req.body.username.length >20 ) {
        error_validation =('add username btwen 6 and 20');
    } else if(!req.body.email.toLowerCase().match(email_regex)) {
        error_validation =('invalid email format');
        
    }else if (req.body.password.length < 6|| req.body.password.length >30 ){
        error_validation =('password must be between 6 and 30 characters');
    }
    
    else if (req.body.password !== req.body.repeated_password){
        error_validation =('passwords are not Identical');
    }
    if(error_validation ){
        res.redirect(`/register?error=${error_validation}`);
    }
    else {
        try{
            (async () =>{
                await User.create({username: req.body.username , email: req.body.email, password: req.body.password});
                res.redirect(`/login`);
            })();
        }catch(err) {
            console.log(err.message);
        }
    }
  
}
let error ="";
const validation_login =(req,res) => {
    
    (async() => {
       
        const user = await User.findOne({email: req.body.email});
        if(!user){
            error = "email is not found";
            res.redirect(`/login?error=${error_validation}`);
        }
        else if( user.password <6 ){
            error = "password is not found";
            res.redirect(`/login?error=${error_validation}`);
        }else{
            await user.comparePasswords(req.body.password).then((result) => {
                if (!result) {
                    error = 'password is incorrect';
                    res.redirect(`/login?error=${error_validation}`);
                }else{
                    console.log(user);
                    const userToken = jwt.sign(user.toJSON(),process.env.JWT_ACCESS_SECRET);
                    console.log(userToken);
                    res.redirect('/landing');
                }
            }).catch((err) => console.log(err.message))
        }  
    }) ();


}



module.exports = {
    loadLoginPage,
    loadRegisterPage,
    validation_register,
    validation_login
}

