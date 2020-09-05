// const userServices = require('./services').userServices;

var myplugin = [{
    name: 'onpre',
    register:  async function (server) {
        
        server.ext({
            type: 'onPreResponse',
            async method(request, reply) {
                // // console.log('--------->',request)
                var response = request.response.isBoom ? request.response.output : request.response
                if(response.statusCode>=500){
                    // process.emit('codeError',{path:request.path,responce:request.response})
                  }
                if (!request.headers.origin) {
                    return reply.continue
                  }
                
                  // depending on whether we have a boom or not,
                  // headers need to be set differently.
                
                  response.headers['access-control-allow-origin'] = request.headers.origin
                  response.headers['access-control-allow-credentials'] = 'true'
                  if (request.method !== 'options') {
                    return reply.continue
                  }
                
                  response.statusCode = 200
                  response.headers['access-control-expose-headers'] = 'content-type, content-length, etag'
                  response.headers['access-control-max-age'] = 60 * 10 // 10 minutes
                  // dynamically set allowed headers & method
                  if (request.headers['access-control-request-headers']) {
                    response.headers['access-control-allow-headers'] = request.headers['access-control-request-headers']
                  }
                  if (request.headers['access-control-request-method']) {
                    response.headers['access-control-allow-methods'] = request.headers['access-control-request-method']
                  }             
                 return reply.continue   
            }
          });
    }
}]; 
module.exports = myplugin; 