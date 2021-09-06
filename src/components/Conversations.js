import React, {useEffect, useState} from "react";
import {fire, projectFirestore, timestamp} from "../firebase";
import Messages from "./Messages";
import ChatList from "./ChatList";
import "./Conversations.css";

const Conversations = () => {

    const [currentUserid, setCurrentUserid] = useState('');
    const [usersId, setUsersId] = useState([]);
    const [chatid, setChatid] = useState('');
    const [expandChat, setExpandChat] = useState(false);
    const [expandChatUserId, setExpandChatUserId] = useState('');
    const [formValue, setFormValue] = useState('');

    fire.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
            setCurrentUserid(authUser.uid);
        } else {
            setCurrentUserid('');
        }
    });

    useEffect(() => {
        const tempUsers = [];
        let messagesRef = projectFirestore.collection('ChatsID');
        const subscriber = messagesRef.onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) =>  {
                console.log(currentUserid)
                if (doc.data().userId1 === currentUserid) {
                    tempUsers.push(doc.data().userId2)
                }
                if (doc.data().userId2 === currentUserid) {
                    tempUsers.push(doc.data().userId1)
                }
            });
            setUsersId(tempUsers);
        })

        return () => {
            subscriber();
        }
    },[currentUserid]);

    const sendMessage = async (e) => {
        e.preventDefault();

        await projectFirestore.collection('Messages').add({
            msg: formValue,
            createdAt: timestamp(),
            productId: expandChatUserId,
            userId1: currentUserid,
            userId2: expandChatUserId,
            sendingUser: currentUserid,
            chatId: chatid
        })
        setFormValue('');
    }

    const handleExpandChat = async (userid) => {
        setExpandChat(true);
        setExpandChatUserId(userid);
        let chatsIDRef = await projectFirestore.collection('ChatsID');
        console.log(`current ${currentUserid}`);
        console.log(`userid ${userid}`)
        chatsIDRef.onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if ((doc.data().userId1 === currentUserid && doc.data().userId2 === userid) || (doc.data().userId1 === userid && doc.data().userId2 === currentUserid)) {
                    setChatid(doc.id);
                }
            });
        })
    }

    return (
        <div className="conversationsContainer">
            <div className="fullChat">
                <div className="displayingMessages">
                    {expandChat && chatid && <Messages chatid={chatid}/>}
                </div>
                <div className="sendingMessages">
                    {expandChat ?
                        <form className="chatForm" onSubmit={sendMessage}>
                            <input className="chatInput" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="הקלד הודעתך כאן" />
                            <div className="sendMessageBtnContainer">
                                <button className="sendMessageBtn" type="submit" disabled={!formValue}>שליחת הודעה</button>
                            </div>
                        </form> : ''}
                </div>
            </div>
            <div className="messagesList">
                {usersId && usersId.map(userid =>
                    <div className="buttonsContainer">
                        <button className="buttonMessage" onClick={() => {handleExpandChat(userid)}} value={userid}>
                            <ChatList userid={userid}/>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )

}

export default Conversations;
