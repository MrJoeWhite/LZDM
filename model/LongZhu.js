var upload = require("./upload.js");
/**
 * Created by deng on 16-7-21.
 */
function LongZhu(roomid) {
    this.roomid=roomid;
}
LongZhu.prototype.start=function () {
    var request = require('request');
    request("http://star.longzhu.com/m/"+this.roomid,function (error, response, body) {
        if (error){
            return console.log(error);
        }
        var start = body.indexOf("{ roomid:")+"{ roomid:".length;
        var end = body.indexOf(",domain:");
        var room_id = body.substring(start
            ,end).trim();
        console.log(room_id);
        var WebSocketClient = require('websocket').client;
        var data=[];
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
                    // console.log(room_id+"-----------"+message.utf8Data);
                    var parse = JSON.parse(message.utf8Data);
                    parse.ctime = new Date().getTime();
                    switch (parse.type){
                        case "gift":
                            data.push(parse);
                            break;
                        case "chat":
                            data.push(parse);
                            break;
                        default:
                            break;
                    }
                    if (data.length > 20) {
                        // console.log(JSON.stringify(mydata));
                        upload.uploadSerivce(room_id, "longzhu", data);
                        data = [];
                    }
                }
            });
        });
        client.connect("ws://mbgows.plu.cn:8805/?room_id=" +room_id);
    });
    
};
module.exports = LongZhu;