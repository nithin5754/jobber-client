import { io, Socket } from 'socket.io-client';
import { showErrorToast } from 'src/shared/utils/utils.service';



export let socket: Socket;

class SocketService {
  setupSocketConnection(){
    socket=io(import.meta.env.VITE_BASE_ENDPOINT)
    this.socketConnectionEvents()
  }

  socketConnectionEvents() {

    socket.on('disconnect', (reason: Socket.DisconnectReason) => {
      showErrorToast(`Reason: ${reason}`);
      socket.connect();
    });


    

    socket.on('connect_error', (error: Error) => {
      console.log(`${error}`);
      socket.connect();
    });
  }
}



export const socketService=new SocketService();