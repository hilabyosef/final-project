import { useState, useEffect } from 'react';
import {fire, projectFirestore} from "../firebase";

const HandleRecs = (currentUser) => { //taking in a collection from which we want our images from

    const [recs, setRecs] = useState([]);
    const handleResponse = (response) => {
        setRecs(response);
    }

    useEffect(() => {//passing a callback function that will fire whenever the dependencies change
        const fetchData = async () => {
            if (currentUser) {
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
                const url = "http://127.0.0.1:8000/app/register";
                const response = await fetch(url, requestOptions).then(response => response.json())
                    .then(response => handleResponse(response));
            }

        }

        fetchData();

    }, [currentUser]);

    return { recs }
}

export default HandleRecs
