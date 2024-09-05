"use client";

import { IoSendSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const Messages = () => {
  const [naming, setNaming] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState([]);

  const socket = io("http://localhost:9000");

  useEffect(() => {
    socket.on("response", ({ name, msg }) => {
      setChats((prevChats) => [...prevChats, { name, msg }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMSG = () => {
    if (!(msg.length >= 1)) {
      return false;
    }
    socket.emit("msg", { name, msg });
    setMsg("");
  };

  const handleName = () => {
    if (!(naming.length >= 3)) {
      return false;
    }
    setName(naming);
    setNaming("");
  };

  const handleNamingKeydown = (e) => {
    if (e.key === "Enter") {
      handleName();
    }
  };

  const handleMsgKeydown = (e) => {
    if (e.key === "Enter") {
      handleMSG();
    }
  };

  return (
    <>
      <div className="flex flex-col w-full px-5 py-[3rem] gap-[1rem]">
        {name.length < 3 ? (
          <h2 className="text-center"> please enter your name</h2>
        ) : (
          <>
            {chats.map((chat, index) => (
              <div className={`w-full flex flex-col ${chat.name === name ? "items-start" : "items-end"} gap-3`} key={index}>
                {chats.length < 2 ? chat.name : chats[index - 1]?.name === chat.name ? null : <h4>{chat.name}</h4>}
                <div className={`${chat.name === name ? "bg-blue-800" : "bg-gray-500"} px-4 py-2 rounded-lg`}>{chat.msg}</div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="fixed bottom-0 backdrop-blur-md inset-x-[25%] w-[50%] flex justify-center items-center h-[10rem]">
        {name.length >= 3 ? (
          <div className="w-[70%] justify-center h-[6rem] flex gap-5 items-center">
            <input
              className="w-[75%] h-[50%] px-5 py-1 text-lg rounded-xl"
              placeholder="Message"
              value={msg}
              onKeyDown={handleMsgKeydown}
              onChange={(e) => setMsg(e.target.value)}
            />
            <div
              className={`${
                msg.length >= 1 ? "bg-blue-500 hover:bg-blue-300" : "bg-blue-100"
              } duration-300 w-10 h-10 rounded-full flex justify-center items-center`}
              onClick={handleMSG}
            >
              <IoSendSharp />
            </div>
          </div>
        ) : (
          <div className="w-[70%] justify-center h-[6rem] flex gap-5 items-center">
            <input
              className="w-[75%] h-[50%] px-5 py-1 text-lg rounded-xl"
              placeholder="Your Name"
              value={naming}
              onKeyDown={handleNamingKeydown}
              onChange={(e) => setNaming(e.target.value)}
            />
            <div
              className={`${
                naming.length >= 3 ? "bg-blue-500 hover:bg-blue-300" : "bg-blue-100"
              } duration-300 w-10 h-10 rounded-full flex justify-center items-center`}
              onClick={handleName}
            >
              <FaCheck />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Messages;
