import {projectFirestore} from "../firebase";
import React, {useEffect, useState} from "react";

const ChatList = ({userid}) => {
    const [userNickname, setUserNickname] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let nickname;
        const subscriber = async () => {
            await projectFirestore.collection('testCreateUser').
            doc(userid).get().then(doc => nickname = doc.data().nickname)
            setUserNickname(nickname)
        }

        subscriber();
        setLoading(false)
    },[]);

    return (
        loading ? <p>loadingg</p> :
            <div className="messageDetails">
                <h4>{userNickname}</h4>
            </div>
    )
}

export default ChatList;
