const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    id:String,
    nome:String,
    usuario:String,
    senha:String
},{
    collection:'usuarios'
});
module.exports = mongoose.model('usuarios',userSchema);