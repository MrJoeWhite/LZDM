/**
 * Created by hzq on 16-8-29.
 */
var request = require("request");
var LongZhu=require('./LongZhu');
EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();

exports.crawler = function (page) {
    var options = { method: 'GET',
        url: 'http://api.plu.cn/tga/streams',
        qs:
        { 'max-results': '50',
            'start-index': + page*50,
            'sort-by': 'views',
            filter: '0',
            game: '0' },
        headers:
        { 'postman-token': 'ab63389f-3229-3b24-0225-ae436162c09c',
            'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
        if (error) return console.log(error.message);

        var parse = JSON.parse(body).data.items;
        for(var i = 0; i < parse.length; i++){
            myEvents.emit("sendmsg", parse[i].channel.domain);
        }
        
    });
};

myEvents.on("sendmsg", function (domain) {
    new LongZhu(domain);
    // longZhu.start();
});
