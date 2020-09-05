'use strict';
const {transactions} = require("../models")
const boom = require('boom')

async function addTransaction(payload){
    try{
       let total =  await transactions.findOne({},{total:1},{lean:true}).sort({ _id: -1 })
       total = total?total.total:0
        if(total - payload.amount < 0 && payload.type == 1){
            return boom.badRequest('Amount cannot be -ve')
        }
        let newTotal 
        if(payload.type == 1){
            newTotal = total - payload.amount
        }else{
            newTotal = total + payload.amount
        }
            await new transactions({amount:payload.amount,description:payload.description,type:payload.type,total:newTotal}).save();
       return {}
  
    }catch(e){
        console.log(e)
        return boom.badRequest()
    }
}
async function getTransaction(){
    try{
      let data = await transactions.find({},{},{lean:true}).sort({ _id: -1 })
    return data
    }catch(e){
        console.log(e)
        return boom.badRequest()
    }
}

    module.exports = {
        getTransaction,
        addTransaction
   
};