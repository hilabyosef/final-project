import React, {useState} from 'react';
import './Inbox.css';
import Conversations from "./Conversations";

const Inbox = () => {
    const [expandTakingMessages, setExpandTakingMessages] = useState(false);
    const [expandGivingMessages, setExpandGivingMessages] = useState(false);
    const [expandUsersChat, setExpandUserChat] = useState(false);

    const handleExpandUsersChat = () => {
        if(expandGivingMessages) {
            setExpandGivingMessages(!expandGivingMessages)
        }
        if (expandTakingMessages) {
            setExpandTakingMessages(!expandTakingMessages)
        }
        setExpandUserChat(!expandUsersChat)
    }

    return (
        <div className="messagesContainer">
            <Conversations />
        </div>
    )
}

export default Inbox;
