import { useState, useEffect } from 'react';
import {fire, projectFirestore} from "../firebase";

const HandleMost = (currentUser, isMost) => { //taking in a collection from which we want our images from

    const [most, setMost] = useState([]);
    const handleResponse = (response) => {
        console.log(response);
        setMost(response);
    }

    useEffect(() => {//passing a callback function that will fire whenever the dependencies change
        const fetchData = async () => {
            if (currentUser && isMost) {
                const user = {currentUser};
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: user.currentUser
                    })
                };
                const url = "https://fierce-depths-60636.herokuapp.com/https://mysterious-cove-83556.herokuapp.com/app/find_similarities";
                const response = await fetch(url, requestOptions).then(response => response.json())
                    .then(response => handleResponse(response));
            }

        }

        fetchData();

    }, [currentUser, isMost]);

    return { most }
}

export default HandleMost
