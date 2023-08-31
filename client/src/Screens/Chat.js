import React,{useState,useEffect,useRef} from 'react'
import { BsEmojiSmile } from "react-icons/bs";

import {PiChatsCircle} from  'react-icons/pi';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// import socket from '../utility/socket'
import io from 'socket.io-client';

const Chat = () => {

  
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  // const [socket,setSocket] = useState(null)
  const socket = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize the socket instance only once
    if (!socket.current) {
      socket.current = io('http://localhost:5000', { transports: ['websocket'] });
      
      // Listen to 'message' events
      socket.current.on('message', (msg) => {
        setReceivedMessages((prevMessages) => [...prevMessages, msg]);
      });
      
      // Clean up the socket on component unmount
      // return () => {
      //   socket.current.disconnect();
      // };
    }
  }, []);

  // useEffect(() => {
  
  //     const newSocket = io('http://localhost:5000', { transports: ['websocket'] });
  //     setSocket(newSocket);
     
    
      
  // }, []);


  useEffect(()=>{
    if(socket.current){
      socket.current.on('message', (msg)=>{
        setReceivedMessages((prevMessages) => [...prevMessages, msg]);
      })
   
      
      return () => {
        socket.current.off('message');
      };
    }
  })


   if(location.state==undefined){return(<div>Can't access this resource</div>)}
  const { username, selectedRoom } = location.state;

 


  const sendMessage = (msg) =>{
    setMessage('')
    socket.current.emit('chatMessage',message);
  }

  const leaveRoom = (msg) =>{
    socket.current.emit('disconnect')
     navigate('/')
  }
 
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


         <button onClick={leaveRoom} className='w-[130px] mx-10 bg-white transition-colors duration-300 ease-in-out transform hover:bg-gray-400 active:bg-gray-500'>
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

          {/* chats Should be displayed here */}

          <div className='h-[100%] w-[70%] bg-white overflow-y-scroll   '>
              <div className='bg-gray-300 p-2 mx-5 my-3 font-bold'>Hello {username}, Welcome to ChatCord</div>
             { console.log(receivedMessages.length)}
              {
              receivedMessages.map((msg,index)=>(
                 <div key={index} className='bg-gray-300 p-2 mx-5 my-3'> {msg}</div>
              ))
}
          </div>

          
             

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

          <button className='w-[90px] ml-1 bg-gray-200 h-[35px] text-blue-400 transition-colors duration-300 ease-in-out transform hover:bg-gray-300 active:bg-gray-500'
          onClick={sendMessage}>
            Send
          </button>
        </div>

     </div>
      
    </div>
      
  )
}

export default Chat

