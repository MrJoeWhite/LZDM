/**
 * Created by deng on 16-7-13.
 */




function monitorRoom(roomid)
{
    // request()
    var cookie;
    var WebSocketClient = require('websocket').client;

    var client = new WebSocketClient();

    client.on('connectFailed', function(error) {
        console.log('Connect Error: ' + error.toString());
    });

    client.on('connect', function(connection) {

        console.log('WebSocket Client Connected');
        connection.on('error', function(error) {
            console.log("Connection Error: " + error.toString());
        });
        connection.on('close', function() {
            console.log('echo-protocol Connection Closed');
        });
        connection.on('message', function(message) {
            if (message.type === 'utf8') {
                console.log(message.utf8Data);
                var parse = JSON.parse(message.utf8Data);
                switch (parse.type){
                    case "gift":
                        break;
                    case "chat":
                        break;

                }
            }
        });
        // function sendData(data) {
        //     try {
        //         if (connection.connected) {
        //
        //             connection.sendUTF((JSON.stringify(data)).toString());
        //             setTimeout(sendData, 1000);
        //         }
        //     }catch (e){
        //         console.log(e.message);
        //     }
        //
        // }
        // setInterval(function(){
        // }, 45000);
        // function sendNumber() {
        //     if (connection.connected) {
        //         var number = Math.round(Math.random() * 0xFFFFFF);
        //         connection.sendUTF(number.toString());
        //         setTimeout(sendNumber, 1000);
        //     }
        // }
        // sendNumber();
    });

    client.connect("ws://mbgows.plu.cn:8805/?room_id=" +roomid);

}
function getRoomid(room_id) {
    var request = require('request');
    request("http://star.longzhu.com/m/"+room_id,function (error, response, body) {
        if (error){
            return console.log(error);
        }
        var start = body.indexOf("{ roomid:")+"{ roomid:".length;
        var end = body.indexOf(",domain:");
        var substring = body.substring(start
        ,end).trim();
        console.log(substring);
        monitorRoom(substring);
    })
}
// monitorRoom('24158');
getRoomid("haiwang");