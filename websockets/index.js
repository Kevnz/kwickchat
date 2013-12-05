

exports.init = function (primus) {
    primus.on('connection', function connection(spark) {
        console.log('new connection');

        console.log('connection has the following headers', spark.headers);
        console.log('connection was made from', spark.address);
        console.log('connection id', spark.id);

        spark.on('data', function (data) {
            console.log('received data from the client', data);

            //
            // Always close the connection if we didn't receive our secret imaginary handshake.
            //
            //if ('foo' !== data.secrethandshake) spark.end();
                spark.write({ foo: 'bar' });
                spark.write('banana');
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