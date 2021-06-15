
import React, { useState, useEffect } from "react";
import JSONCITY from '../city_list.json';



const Autocomplete = (props) => {

    const {city,
        setCity,
        street,
        setStreet,
        houseNr,
        setHouseNr,
        streetNum,
        setStreetNum} = props;

    const [isCityVisible, setIsCityVisible] = useState(false);

    const handleCityOnChange = (e) => {
        if (e.target.value.length > 0) {
            setIsCityVisible(true);
            setCity(e.target.value)
        } else {
            setIsCityVisible(false);
            setCity('');
        }
    };

    const handleClick = (chosenCity) => {
        setCity(chosenCity)
        setIsCityVisible(false)
    };

    const handleHouseNr = (e) => {
        const streetNr = `${street} ${e}`;
        setStreetNum(streetNr)
    };


    return (
        <div className="pickup-location-div">
            <div key="x" className={isCityVisible ? "location-auto-visible" : "location-auto-hidden" }>
                <input className="city-name" type="text" placeholder="עיר" value={city}
                       onChange={(e) => {handleCityOnChange(e)}}
                />
                {JSONCITY.location.filter((val) => {
                    if (val.name.includes(city)) {
                        return val
                    }
                }).slice(0,7).map((val, key) => {
                    return (
                        isCityVisible && <option value={val.eng_name}
                                                 onClick={(e) => {handleClick(val.name)}}>
                            {val.name}
                        </option>
                    )
                })}
            </div>
            <div key="y">
                <input className="street-name" type="text" placeholder="רחוב" value={street} onChange={(e) => {setStreet(e.target.value)}}/>
            </div>
            <div key="z">
                <input className="house-number" type="text" placeholder="מספר" value={houseNr} onChange={(e) => {
                    setHouseNr(e.target.value);
                    handleHouseNr(e.target.value)}}/>
            </div>
        </div>

    )
}

export default Autocomplete
