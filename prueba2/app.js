const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 9001 });

var dibujosIniciales = [];
var dibujosDownload = [];
var clients = [];

wss.on('connection', function conecction(ws, req) {

    let ip = req.connection.remoteAddress;

    ws.on('message', function incoming(message) {
        console.log('recived: %s', message);
        if (isJson(message)) {
            var obj = JSON.parse(message);
            if (obj.section == 'init') {

                let retInit = {
                    'ws': ws,
                    'ip': ip,
                    'section': 'init',
                    'conectados': clients.length + 1
                }
                clients.push(retInit);
                //ws.send(JSON.stringify(retInit));
                broadcastUsers(retInit);
                broadcastDibujosIniciales(ws);
            }
            else if(obj.section == 'download'){
              ws.send(JSON.stringify(dibujosDownload));
            }
            else {
                let retMessage = {
                    'ws': ws,
                    'section': 'objeto',
                    'type': obj.type,
                    'data': obj.data
                };
                let objetoInicial = {
                    'ws': ws,
                    'section': 'init',
                    'section2': 'objeto',
                    'type': obj.type,
                    'data': obj.data
                };
                let objetoDownload = {
                    'section': 'download',
                    'type': obj.type,
                    'data': obj.data
                };
                dibujosIniciales.push(objetoInicial);
                dibujosDownload.push(objetoDownload);
                broadcastDibujos(retMessage);
            }
        }
    })
})

wss.on('close', function close() {
    console.log("CERRRAAAAAAANDOOO")
    /*ws.on('message', function incoming(message) {
        console.log('recived: %s', message);
        if (isJson(message)) {
            disconnectClient(ws);
        }
    })*/
});


function isJson(str) {
    try {
        JSON.parse(str);
    } catch (error) {
        return false;
    }
    return true;
}

broadcastUsers = function (message) {
    clients.forEach(function (cnn) {
        if (cnn.ws) {
            let retInit = {
                'section': 'init',
                'section2': 'users',
                'conectados': message.conectados
            }
            cnn.ws.send(JSON.stringify(retInit));
        }
    });
};

broadcastDibujos = function (message) {
    clients.forEach(function (cnn) {
        cnn.ws.send(JSON.stringify(message));

    });
};

broadcastDibujosIniciales = function (ws) {
    clients.forEach(function (cnn) {
        if (cnn.ws == ws) {
            cnn.ws.send(JSON.stringify(dibujosIniciales));
        }
    });
};

