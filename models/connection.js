let mongoose = require('mongoose');
const options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
        useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://admin:admin@cluster0.np8lf.mongodb.net/morningnews?retryWrites=true&w=majority',
    options,    
    function(err) {
     console.log(err);
    }
   );
module.exports = mongoose;