'use strict';

const transactionController = require("../Controllers/transactionController");
const Joi =require('joi')
var routes = [];


exports.addTransaction = {
    method: "POST",
    path: "/addTransaction",
    async handler(request,reply) {
     const data = await transactionController.addTransaction(request.payload);
    return data
    },
    config:{
    tags: ['api'],    
    validate: {
        payload:{
          description: Joi.string().required(),
          amount: Joi.number().required(),
          type: Joi.number().required().description('1-debit,2-credit'), 
        },
    },
    plugins: {
        'hapi-swagger': {
            responses: {
                '400': {
                    'description': 'BadRequest'
                }
            },
            payloadType: 'form'
        }
    },  
} 
};
exports.getTransaction = {
    method: "GET",
    path: "/getTransaction",
    async handler(request,reply) {
     const data = await transactionController.getTransaction(request.payload);
    return data
    },
    config:{
    tags: ['api'],    
    validate: {
       query:{

       }
    },
    plugins: {
        'hapi-swagger': {
            responses: {
                '400': {
                    'description': 'BadRequest'
                }
            },
            payloadType: 'form'
        }
    },  
} 
};

for (let key in exports) {
    routes.push(exports[key])
}

module.exports = routes;
