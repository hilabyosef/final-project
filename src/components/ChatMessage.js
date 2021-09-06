import React from 'react';
import { fire, projectFirestore } from "../firebase";
import "./ChatMessage.css"

const ChatMessage = (props) => {

    const { msg, sendingUser } = props.message;
    const auth = fire.auth();
    const messageClass = sendingUser === auth.currentUser.uid ? 'sent' : 'received';
    return (<>
        <div className={`message ${messageClass}`}>
            <p className="messageContent">{msg}</p>
        </div>
    </>)
}

export default ChatMessage;
