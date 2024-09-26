import React, { useEffect, useState } from "react";
import { user } from '../Join/Join';
import socketIo from 'socket.io-client';
import './chat.css';
import { FiSend } from "react-icons/fi";
import Message from "../Message/Message";
import ScrollToBottom from 'react-scroll-to-bottom';
import { RiCloseLine } from "react-icons/ri";

let socket;
const ENDPOINT = 'http://localhost:4500/'



const Chat=()=> {
    const [id, setId] = useState('')
   //const[socket,setSocket]=useState(null);
   const[message,setMessage]=useState([])
   const[privateChat,setPrivateChat]=useState(null);

   const send = () => {
    const message = document.getElementById('chatInput').value;
    if (privateChat) { // Check if socket is available before using it
      socket.emit('privateMessage', { sender:id, receiver:privateChat,message });
    } else {
      socket.emit('message',{message,id});
    }
    document.getElementById('chatInput').value = '';
  };


    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });


        socket.on('connect', () => {
            //alert('connected');
            setId(socket.id);
        })

        console.log(socket)
        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            setMessage([...message,data])
            console.log(data.user, data.message);
        })
        socket.on('userjoined', (data) => {
            setMessage([...message,data])
            console.log(data.user, data.message);
        })
        socket.on('leave', (data) => {
            setMessage([...message,data])
            console.log(data.user, data.message)
        })
        socket.on('sendMessage',(data)=>{
            setMessage([...message,data]);
        })
        socket.on('privateMessage',(data)=>{
            setMessage([...message,data])
        }
    )
        return () => {
            socket.emit('connection finish');
            socket.off();
        };
    }, [])


    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessage([...message, data]);
            console.log(data.user, data.message, data.id);
        })
        return () => {
            socket.off();
        }
    }, [message])
    
    
   
    return (
        <div>   

            <div className="chatpage">
                <div className="chatContainer">
                    <div className="chatHeader">
                        <h2>QuickChat</h2>
                 <a href="/" > <RiCloseLine  className="closeIcon"/></a> 
                    </div>
                    <ScrollToBottom className="chatBox">
                       {message.map((item,i)=><Message user={item.id===id?``:item.user} message={item.message} classs={item.id===id ?`right`:`left`}
                       key={i}/>
                    )} 
                        
                    </ScrollToBottom>
                    <div className="inputBox">
                        <input onKeyPress={(event)=>event.key==='Enter'? send():null} type="text" id="chatInput"></input>
                        <button onClick={send} type="send"  className="sendbtn">
                            <FiSend className="sendlogo" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Chat;