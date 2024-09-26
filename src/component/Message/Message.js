import React from "react";
import './message.css';


function Message({user,message,classs}) {
    if(user){
    return(
        <div className={`messageBox  ${classs}`}>
            <span style={{ fontWeight: 'bold',  color:'#2f5a72',textTransform:'capitalize'}}>{user}</span>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize:'12px', fontFamily:'sans-serif'}}>{message}</pre>
           
            </div>
    
    )
}
else{
    return(
        <div className={`messageBox  ${classs}`}>
           You
           <pre style={{ fontSize:'12px', fontFamily:'sans-serif' }}>{message}</pre>
           
            </div>
    
    )
} 
}

export default Message;