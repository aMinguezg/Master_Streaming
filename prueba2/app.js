const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer ({port: 9001});

var dibujos = [];
var clients = [];

wss.on('connection', function conecction(ws, req){

    let ip = req.connection.remoteAddress;

    ws.on('message', function incoming(message){
        console.log('recived: %s', message);
        if (isJson(message)) {
            var obj = JSON.parse(message);
            if (obj.section == 'init' ) {
                
                    let retInit = {
                        'ws': ws,
                        'ip': ip,
                        'section': 'init',
                        'conectados': clients.length + 1
                    }
                    clients.push(retInit);
                    //ws.send(JSON.stringify(retInit));
                    broadcastUsers(retInit);
                }
            else{
                    let retMessage = {
                        'ws': ws,
                        'section': 'objeto',
                        'type': obj.type,
                        'data': obj.data
                    }
                    dibujos.push(retMessage);
                    ws.send(JSON.stringify(retMessage));
                }  
            }
    })
})

wss.on('close', function close() {
    console.log('disconnected');
    ws.on('message', function incoming(message){
        console.log('recived: %s', message);
        if (isJson(message)) {
            disconnectClient(ws);
        }
    })
});


function isJson(str){
    try {
        JSON.parse(str);
    } catch (error) {
        return false;
    }
    return true;
}

broadcastUsers = function(message) {
    clients.forEach(function(cnn) {
            if (cnn.ws){
                cnn.ws.send(JSON.stringify(message.conectados)); 
            }   
    });
};

disconnectClient = function(ws) {
    console.log("CERRRAAAAAAANDOOO")
    for (var i = 0; i < clients.length; i++) {
        if (clients[i].ws == ws) {
            clients.splice(i, 1);
            i--;
        }
    }
};
/*broadcast = function(message, ws) {
    clients.forEach(function(cnn) {
        if (cnn.ws != ws) {
            if (cnn.ws) cnn.ws.send(JSON.stringify(message));
        }
    });
};*/