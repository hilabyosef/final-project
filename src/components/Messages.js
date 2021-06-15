import { projectFirestore } from "../firebase";
import React from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";

const Messages = ({chatid}) => {
    console.log("here");
    console.log(chatid)
    let messagesRef = projectFirestore.collection('Messages');
    messagesRef =  messagesRef.where('chatId', "==", chatid).orderBy('createdAt');
    console.log(messagesRef)
    const [messages] = useCollectionData(messagesRef, { idField: 'id' });
    console.log(messages)
    return (
        <div className="messaging-container">
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        </div>
    )
}

export default Messages;
