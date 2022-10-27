import { Server as wsServer } from 'socket.io';

export const configureSocket = (server) => {
  const io = new wsServer(server);
  io.on('connection', (socket) => {
    // socket.emit('eventFromServer', 'Hello, World 👋');
    socket.on('eventFromClient', (msg) => {
      console.log('message from the client: ' + msg);
      io.emit('eventFromServer', msg + " from the server");
    });
  });
};
