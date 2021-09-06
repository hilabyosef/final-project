import React, {useEffect, useState} from 'react';
import { fire, projectFirestore, timestamp } from "../firebase";
import "./ContactSeller.css"
import Messages from "./Messages";

const ContactSeller = (props) => {

    const [userid, setUserid] = useState('');
    const [chatid, setChatid] = useState('');
    const [formValue, setFormValue] = useState('');
    let {givingUserId, productId} = props.location.state;
    givingUserId = givingUserId.replace(/ /g,'')

    fire.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
            setUserid(authUser.uid);
        } else {
            setUserid('');
        }
    });

    useEffect(() => {
        let tempChatId;
        let chatsIDRef = projectFirestore.collection('ChatsID');

        const subscriber = chatsIDRef.onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if ((doc.data().userId1 === userid && doc.data().userId2 === givingUserId) || (doc.data().userId1 === givingUserId && doc.data().userId2 === userid)) {
                    tempChatId = doc.id
                    setChatid(doc.id)
                }
            })

            if (!tempChatId) {
                console.log("no chat id");
                projectFirestore.collection('ChatsID').add({
                    userId1: userid,
                    userId2: givingUserId
                }).then((docRef) => setChatid(docRef.id)).catch(error => alert(error.message));
            }
        })

        return () => {
            subscriber();
        }

    }, [userid])

    const sendMessage = async (e) => {
        e.preventDefault();

        await projectFirestore.collection('Messages').add({
            msg: formValue,
            createdAt: timestamp(),
            productId: productId,
            userId1: givingUserId,
            userId2: userid,
            sendingUser: userid,
            chatId: chatid

        })
        setFormValue('');
    }

    return (
        <div className="contact-seller-div">
            <div className="full-chat">
                <div className="messaging-div">
                    {chatid && <Messages chatid={chatid} />}
                </div>
                <form className="chat-form" onSubmit={sendMessage}>
                    <input className="chat-input" value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                    <button className="send-message-btn" type="submit" disabled={!formValue}>שלח</button>
                </form>

            </div>
        </div>
    )
}


export default ContactSeller;
