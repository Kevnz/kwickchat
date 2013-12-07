var Rooms = require('primus-rooms');


var joinRoom = function (room, spark) {
    console.log('the funk',!~spark.rooms().indexOf(room))
    if (!~spark.rooms().indexOf(room)) {
        spark.join(room, function(){
            spark.write('you joined room ' + room);
            spark.room(room).write(spark.id + ' joined room ' + room);
        });
    }
};
var leaveRoom = function (room, spark) {
    spark.leave(room, function () {
        spark.write('you left room ' + room);
        spark.room(room).write(spark.id + ' has left room ' + room);
    });
}
exports.init = function (primus) {
    primus.use('rooms', Rooms);

    primus.on('connection', function connection(spark) {
        console.log('new connection');

        console.log('connection has the following headers', spark.headers);
        console.log('connection was made from', spark.address);
        console.log('connection id', spark.id);

        spark.on('data', function (data) {
            console.log('received data from the client', data);
            data = data || {};
            var action = data.action;
            var room = data.room || data;

            console.log('The room', room);
            console.log('the action',  action);
            if (action === 'join') {
                console.log('join room',room);
                joinRoom(room, spark);
            }
            if (action === 'leave') {
                leaveRoom(room, spark);
            }
            console.log('write to room');
            if (data.message) {
                console.log('writing to room', room);
                console.log('writing message', data.message);
                spark.room(room).write({ room: room, user: data.user || 'unknown', message: data.message });
            }


        });

        spark.write('Hello world');
    });
    primus.on('disconnection', function (spark) {
      // the spark that disconnected
    });
    //
    // Save the compiled file to the hard disk so it can also be distributed over
    // cdn's or just be served by something else than the build-in path.
    //
    primus.save('public/js/vendor/primus.js');

};