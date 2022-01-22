const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/Booking')
.then(()=>console.log('mongodb is connected ...') )
.catch((err)=> console.log(err.message))


module.exports= mongoose;