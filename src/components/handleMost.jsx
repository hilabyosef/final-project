import { useState, useEffect } from 'react';
import {fire, projectFirestore} from "../firebase";

const HandleMost = (currentUser, isMost) => { //taking in a collection from which we want our images from

    const [most, setMost] = useState([]);
    const handleResponse = (response) => {
        const recommeneded = {'uaBgNIP3fNs0LayebrOT':0, 'jnBVs5fCfFqV4w9Gnbrt':1, 'W8oGaX7e8bqILfUmQteq':2, 'MhzgBANadeRARf5az4Ke':3};
        setMost(recommeneded);
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
                const url = "http://127.0.0.1:8000/app/find_similarities";
                const response = await fetch(url, requestOptions).then(response => response.json())
                    .then(response => handleResponse(response));
            }

        }

        fetchData();

    }, [currentUser, isMost]);

    return { most }
}

export default HandleMost
