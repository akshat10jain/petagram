const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/UserLogin',(err)=>{
    if(err){
        console.log('not connected to database'+ err)
    }else{
        console.log('connected to database')
    }
  })

module.exports={mongoose}  