const io = require('socket.io')();
io.on('connection', client => {
    client.on('identify', data => { 
        console.log(data)
     });
});
io.listen(3000);