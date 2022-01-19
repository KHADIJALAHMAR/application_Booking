const loadLoginPage = (req,res) => {
    res.render('login');    
};
const loadRegisterPage =(req ,res) =>{
    res.render('register');
}





module.exports = {
    loadLoginPage,
    loadRegisterPage
}

