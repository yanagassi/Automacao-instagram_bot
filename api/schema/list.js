const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    id:String,
    id_usuario:String,
    pessoa:String,
    status:String
},
{
    collection:'list_follow'
});
module.exports = mongoose.model('list_follow',userSchema);

