if(window.WebSocket){
    console.log("WebSocket supported.");
}
else{
    console.log("WebSocket NOT supported");
    alert("Consider updating your browser for a better experience.");
}

window.addEventListener("load", init);

wsUri = "ws://localhost:9001";

function init(){
    output = document.getElementById("output");
    testWebSocket();
}

function testWebSocket(){
    websocket = new WebSocket(wsUri);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
    websocket.onerror = onError;
}

function onOpen(){
    writeToScreen("CONNECTED");
    doSend("Primera prueba!");
}
function onClose(){
    writeToScreen("DISCONNECTED");
}
function onMessage(evt){
    writeToScreen('<span style="color: blue;">Response: ' + evt.data + '</span>');
    websocket.close();
}
function onError(){
    writeToScreen('<span style="color: red;">ERROR:</span>'+ evt.data );
}
function doSend(message){
    writeToScreen("SENT: " + message);
    websocket.send(message);
}
function writeToScreen(message){
    let pre=document.createElement("p");
    pre.innerHTML = message;
    output.appendChild(pre);
}

