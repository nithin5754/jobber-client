import { io, Socket } from 'socket.io-client';
import { showErrorToast } from 'src/shared/utils/utils.service';




class SocketService{
   
  private socket:Socket|null=null;

    /**
   * Set up the socket connection.
   * Configures the connection options and initializes event listeners.
   */


    setupSocketConnection(): void {
      if (this.socket) {
        console.warn('Socket connection already exists.');
        return;
      }
  
      this.socket = io(import.meta.env.VITE_BASE_ENDPOINT, {
        transports: ['websocket', 'polling'],
        secure: true,
      });
  
      this.setupConnectionEvents();
    }

  
  private  setupConnectionEvents():void {
    if(!this.socket){
      console.error('Socket is not initialized.');
      return;
    }

   this.socket.on('connect',()=>{
    console.log('Socket connected:', this.socket?.id);
    
   });

   this.socket.on('disconnect',(reason)=>{
    console.warn(`Socket disconnected. Reason: ${reason}`);
    showErrorToast(`Disconnected. Reason: ${reason}`);
    this.retryConnection();
   })
   this.socket.on('connect_error', (error) => {
    console.error(`Connection error: ${error.message}`);
    this.retryConnection();
  });

  this.socket.on('error', (error) => {
    console.error(`Socket error: ${error.message}`);
  });

  }



  private retryConnection():void{
     setTimeout(() => {
     if(this.socket&&!this.socket.connected){
      this.socket.connect()
     } 
     }, 3000);
  }


  closeSocketConnection():void{
     if(this.socket){
      this.socket.disconnect();
      this.socket.removeAllListeners();
      this.socket=null;
      console.log('Socket connection closed.');
     }else{
      console.warn('No socket connection to close.');
     }
  }

  /**
   * Get the current socket instance.
   * @returns The socket instance or null if not initialized.
   */
  getSocket(): Socket | null {
    return this.socket;
  }
  }

  export const socketService = new SocketService();
  export default socketService;
