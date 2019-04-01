window.addEventListener("load", init);

function init() {
    initServer();
    canvas = new fabric.Canvas('canvas');
    canvas.freeDrawingBrush.color = 'green';
    canvas.freeDrawingBrush.lineWidth = 10;

    circle.addEventListener('click', addCircleHandler);
    triangle.addEventListener('click', addTriangleHandler);
    square.addEventListener('click', addSquareHandler);
    pencil.addEventListener('click', pencilHandler);
    selection.addEventListener('click', selectionHandler);
    jsonButt.addEventListener('click', downloadCanvas)
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (error) {
        return false;
    }
    return true;
}

function downloadCanvas(){
    websocket.send(JSON.stringify({ 'section': 'download' }));
}

function addCircleHandler() {
    let obj = {
        radius: 20,
        fill: 'yellow',
        left: 100,
        top: 100
    };
    sendObject('Circle', obj);
}

function addTriangleHandler() {
    let obj = {
        width: 20,
        height: 30,
        fill: 'blue',
        left: 50,
        top: 50
    };
    sendObject('Triangle', obj);
}

function addSquareHandler() {
    let obj = {
        width: 80,
        height: 80,
        fill: 'red',
        left: 100,
        top: 100
    };
    sendObject('Square', obj);
}

function pencilHandler() {
    canvas.isDrawingMode = true;
}

function selectionHandler() {
    canvas.isDrawingMode = false;
}

function initServer() {
    websocket = new WebSocket('ws://localhost:9001');
    websocket.onopen = connectionOpen;
    websocket.onmessage = onMessageFromServer;
    websocket.onclose = conectionClose;
}

function connectionOpen() {
    websocket.send(JSON.stringify({ 'section': 'init' }));
}

function conectionClose() {
    websocket.send(JSON.stringify({ 'section': 'bye' }));
}

function onMessageFromServer(message) {
    console.log('received: ' + message);
    let obj = JSON.parse(message.data);
    if (obj.section == 'objeto') {
        console.log("got data from server");
        addObject(obj.type, obj.data);
    }
    else if(obj.length > 0 && obj[0].section == 'download'){     
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
        $('<a href="data:' + data + '" download="data.json">Descarga el JSON pulsando este link</a>').appendTo('#container');
    }
    else {
        if (obj.section == 'init') {
            if (obj.section2 == 'users') {
                users.textContent = `Users online: ${obj.conectados}`;
            }
            else {
                if (obj.length != undefined) {
                    obj.forEach(function (cnn) {
                        addObject(cnn.type, cnn.data);
                    })
                }
            }
        }
        else {
            obj.forEach(function (cnn) {
                addObject(cnn.type, cnn.data);
            })
        }
    }
}

function addObject(type, obj) {
    var shape;
    if (type == 'Triangle') {
        shape = new fabric.Triangle(obj);
    }
    else if (type == 'Square') {
        shape = new fabric.Rect(obj);
    }
    else if (type == 'Circle') {
        shape = new fabric.Circle(obj);
    }
    console.log(shape);
    canvas.add(shape);
}

function sendObject(type, obj) {
    websocket.send(JSON.stringify({ 'section': 'objeto', 'type': type, 'data': obj }));
}

