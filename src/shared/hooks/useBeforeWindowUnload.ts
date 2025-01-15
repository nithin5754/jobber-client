

import { useEffect } from 'react';
import { socketService } from 'src/sockets/socket.service';

import { getDataFromSessionStorage } from '../utils/utils.service';

const useBeforeWindowUnload = (): void => {
  const socket=socketService.getSocket()
  useEffect(() => {
    // If the user closes the browser or tab, we emit the socketio event
    window.addEventListener('beforeunload', () => {
      const loggedInUsername: string = getDataFromSessionStorage('loggedInUser');
       if(socket){
        socket.emit('removeLoggedInUser', loggedInUsername);
       }
    });
  }, []);
};

export default useBeforeWindowUnload;
