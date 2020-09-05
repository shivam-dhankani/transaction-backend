
const Hapi = require('hapi');
// const Mongoose = require('mongoose');
// Mongoose.Promise = require('bluebird');
// global.mongoose = Mongoose;
const Mongoose = require('mongoose');
global.mongoose = Mongoose;
let config = require("./config");
let routes = require("./Routes");
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const pre = require('./preCondition')
let port = 3007;
// let host = config.dbConfig.config.PORT;
mongoose.set('debug', true);
(async () => {
const server = new Hapi.Server({  
    host: 'localhost',
    port: port,
    routes: {cors: true} 
  })

  const swaggerOptions = {
    info: {
            title: 'Test API Documentation',
            version: '1.0.0',
        },
    };

await server.register([
    Inert,
    Vision,
    {
        plugin: HapiSwagger,
        options: swaggerOptions
    }
]);

// console.log(connection);
// console.log('1111111111111',config.dbConfig.config.dbURI)
//   server.route({
//     config: {
//         cors: {
//             origin: ['*'],
//             additionalHeaders: ['cache-control', 'x-requested-with']
//         }
//     }
//   }
// );
// server.connection({ routes: { cors: true } }) 
  server.route(routes);
  // mongoose.connect(config.dbConfig.config.dbURI);    

  
  
  async function start () {  
    // start your server
    try {
      await server.start()
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
   let io =require('socket.io')(server.listener);
   console.log('Server running at: ', server.info.uri)
  //  var socket = io.connect();
// console.log('check 1', socket.connected);
   io.on('connection', function(client){
    console.log('aaaaa',client);
    if(client.anonymoxId){
      socket.emit('connected', { hello: 'world' });
    }else{
      socket.emit('error', { data: 'no chat started yet' });
    }
    // socket.on('message send', function (data) {
   
    // });
    });
  }
  
  start()
})() 