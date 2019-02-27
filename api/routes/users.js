var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Lista = require('./../schema/list');
var User = require('./../schema/user');


mongoose.connect('mongodb://localhost/instagram_bot').then(
  ()=>{console.log("Banco de dados conectado !")},
  err =>{console.log("Erro na conexão com o banco de dados !",err);}
);


/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({_id:req.query.id})
  .then((data)=>{
    res.send(data);
  })
  .catch((err)=>{
    res.send(JSON.stringify({status:'error'}));
  })
});


router.get('/lista', function(req, res, next) {
  Lista.find({id_usuario:req.query.id,status:"0"})
  .then((data)=>{
    res.send(data);
  })
  .catch((err)=>{
    res.send(JSON.stringify({status:'error'}));
  })
});


router.get('/seguir', function(req, res, next) {
  Lista.updateOne({id_usuario:req.query.id , pessoa:req.query.pessoa} ,{status:"1"}, (err, doc)=>{
    if(doc.nModified >= 1){
      res.send({
        status : 'sucess',  
        n_linhas:doc.nModified
      });
    }else{
      res.send({
        status : 'error',  
        n_linhas:doc.nModified
      });
    }
  });
});



module.exports = router;
