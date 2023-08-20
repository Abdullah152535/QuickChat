import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { useState } from "react";

const Home = () => {

    const roomOptions = ['ABC', 'XYZ', '123', 'PQR'];

  const [username, setUsername] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(roomOptions[0]);

  

  return (
    <div>
      <div className=" w-[450px] h-[350px] bg-blue-500  mx-auto mt-[50px]">
        <div className="h-[60px]  bg-blue-600 flex justify-center items-center ">
          <div className="mx-1 ">
            {" "}
            <BsEmojiSmile className="h-[40px] w-[30px] text-white " />
          </div>

          <h2 className="text-white font-bold text-xl mx-1 "> QuickChat</h2>
        </div>

        <div className="py-4">

          <p className="my-4 mx-10 text-white ">Username</p>

          {/* Text Input field */}
          <input
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            placeholder="Enter Username..."
            className="h-[35px] mx-9 px-2 w-[80%]"
          />

          <p className="my-4 mx-10 text-white ">Room</p>

          {/* Drop Down Box */}

          <select

            value={selectedRoom}
            onChange={(event) => {
              setSelectedRoom(event.target.value);
            }}

            className="mx-9 w-[80%] px-4 bg-white   border border-gray-300 rounded-md py-2  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
          

            {roomOptions.map((room, index) => (

              <option key={index} value={room}>
                {room}
              </option>

            ))}
          </select>

          <button className="border border-black my-10 bg-gray-300 h-[35px] w-[80%] mx-9 text-blue-500 "
           onClick={()=>{

           }}
          >
            Join Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
