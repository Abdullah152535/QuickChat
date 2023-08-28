import React,{useState,useEffect} from 'react'
import { BsEmojiSmile } from "react-icons/bs";
import {PiChatsCircle} from  'react-icons/pi';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';


const Chat = () => {

  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  const location = useLocation();

  const { username, selectedRoom } = location.state;

  useEffect(() => {
    const socket = io('http://localhost:5000', { transports : ['websocket'] });

    // Listening for messages from the server
    socket.on('message', (message) => {
      // setReceivedMessage(message);
      console.log(message);
    })
    
  },[]);
 
  return (
  
    <div className='w-full h-[100vh] bg-gray-300 box-border m-0 py-10' >
      
     
     <div className=' h-[410px] w-[900px] bg-blue-500 mx-auto '>

       {/* div for Header */}
        <div className='h-[50px] bg-blue-600 flex justify-between items-center'> 

        <div className='flex items-center justify-between' >
        <div className="ml-3 mr-2">
            <BsEmojiSmile className="h-[40px] w-[30px] text-white " />
         </div>
         <h2 className="text-white font-bold text-xl mx-1 "> QuickChat</h2>
        </div>


         <button className='w-[130px] mx-10 bg-white transition-colors duration-300 ease-in-out transform hover:bg-gray-400 active:bg-gray-500'>
          Leave Room
         </button>

        </div>

        {/* div for central part of screen */}
        <div className='h-[300px] flex '>

          <div className='h-[100%] w-[30%] p-3 '>

           <div className='flex  items-center '>
            <PiChatsCircle className='h-[40px] w-[30px] mr-2 text-white  inline '/>
            <p className='font-bold text-l  text-white'>Room Name</p>
           </div>

           <div className='w-[100%] bg-blue-600 text-white  my-2 p-1'> 
              {selectedRoom}
           </div>


          </div>

          <div className='h-[100%] w-[70%] bg-white'></div>

        </div>

        {/* Div for bottom Part */}

        <div className='w-[100%] bg-blue-600 h-[60px] flex items-center'>
        <input
            type="text"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            placeholder="Enter Message..."
            className="h-[35px] ml-9 px-2 w-[80%]"
          />

          <button className='w-[90px] bg-gray-200 h-[35px] text-blue-400 transition-colors duration-300 ease-in-out transform hover:bg-gray-300 active:bg-gray-500'>
            Send
          </button>
        </div>

     </div>
      
    </div>
      
  )
}

export default Chat

