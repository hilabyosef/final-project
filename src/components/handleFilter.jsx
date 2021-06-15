import { useState, useEffect } from 'react';
import {fire, projectFirestore} from "../firebase";

const UseDistance = (currentUser, currentCity, currentStreet, setLoading) => { //taking in a collection from which we want our images from

    const [data, setData] = useState([]);

    const handleResponse = (response) => {
        setData(response);
        setLoading(false);
    }
    useEffect(() => {//passing a callback function that will fire whenever the dependencies change
        const fetchData = async () => {
            if (currentUser.length > 0 && currentCity.length > 0 && currentStreet.length > 0) {
                const streetName = {currentStreet};
                const cityName = {currentCity};
                const userId = {currentUser};
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        userStreet: streetName.currentStreet,
                        userCity: cityName.currentCity,
                        range: 200
                    })
                };
                const url = "http://127.0.0.1:8000/app/products_for_user";
                const response = await fetch(url, requestOptions).then(response => response.json()).then(response => handleResponse(response));
            }

        }

        fetchData();

    }, [currentUser, currentCity, currentStreet]);

    return { data }
}

export default UseDistance
