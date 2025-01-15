import { Dispatch, SetStateAction } from "react";
import { IMessage } from "../interface/chat.interface";
import socketService from "src/sockets/socket.service";
import { cloneDeep, filter, findIndex, remove } from "lodash";
import { UnknownAction } from "@reduxjs/toolkit";
import { lowerCase } from "src/shared/utils/utils.service";





export const chatMessageReceived=(
  conversationId:string,
  chatMessagesData:IMessage[],
  chatMessages:IMessage[],
  setChatMessagesData:Dispatch<SetStateAction<IMessage[]>>
):void=>{

const socket=socketService.getSocket()

if(socket){
  socket.on('message received',(data:IMessage)=>{
chatMessages=cloneDeep(chatMessagesData)
    if(data.conversationId===conversationId){
      chatMessages.push(data)
      const uniq:IMessage[]=chatMessages.filter((item:IMessage,index:number,list:IMessage[])=>{
        const itemIdex= list.findIndex((listItem:IMessage)=>listItem.id===item.id)
        return itemIdex===index
      })
      setChatMessagesData(uniq)
    }
  })
}



}





export const chatListMessageReceived=(
  username:string,
  chatList:IMessage[],
  conversationListRef:IMessage[],
  dispatch: Dispatch<UnknownAction>,
  setChatList:Dispatch<SetStateAction<IMessage[]>>
):void=>{

  const socket=socketService.getSocket()

  if(socket){
    socket.on('message received',(data:IMessage)=>{
  conversationListRef=cloneDeep(chatList)
      if(lowerCase(data.receiverUsername as string)===username||lowerCase(data.senderUsername as string)===username){
        
        const messageIndex=findIndex(chatList,['conversationId',data.conversationId])

        if(messageIndex>-1){
          remove(conversationListRef,(chat:IMessage)=>chat.conversationId===data.conversationId)
        }else{
          remove(conversationListRef,(chat:IMessage)=>chat.receiverUsername===data.receiverUsername)
        }

        conversationListRef=[data,...conversationListRef];

          
      if(lowerCase(`${data.receiverUsername}`)===lowerCase(`${username}`)){

          const list:IMessage[]=filter(
            conversationListRef,
            (item:IMessage)=>!item.isRead&&(item.receiverUsername===username)
          )

          console.log("list",list);
          

      }
        setChatList(conversationListRef)
      }     
    })
  }


}




export const chatListMessageUpdated=(
  username:string,
  chatList:IMessage[],
  conversationListRef:IMessage[],
  dispatch: Dispatch<UnknownAction>,
  setChatList:Dispatch<SetStateAction<IMessage[]>>
):void=>{

  const socket=socketService.getSocket()

  if(socket){
    socket.on('message updated',(data:IMessage)=>{
  conversationListRef=cloneDeep(chatList)
      if(lowerCase(data.receiverUsername as string)===username||lowerCase(data.senderUsername as string)===username){
        
        const messageIndex=findIndex(chatList,['conversationId',data.conversationId])

        if(messageIndex>-1){
          conversationListRef.splice(messageIndex,1,data)
        }

     

          
      if(lowerCase(`${data.receiverUsername}`)===lowerCase(`${username}`)){

          const list:IMessage[]=filter(
            conversationListRef,
            (item:IMessage)=>!item.isRead&&(item.receiverUsername===username)
          )

          console.log("list",list);
          

      }
        setChatList(conversationListRef)
      }     
    })
  }


}