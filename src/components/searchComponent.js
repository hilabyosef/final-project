import React, {useEffect, useState} from 'react'
import SubCategories from "./handle-sub-categories";
import JSONCITY from "../city_list.json";
import './searchComponent.css'
import {fire, projectFirestore} from "../firebase";

const SearchComponent = (props) => {

    const [currentUser, setCurrentUser] = useState('');
    let {search} = {};

    fire.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
            setCurrentUser(authUser.uid);
        } else {
            setCurrentUser('');
        }
    });

    const {searchClicked,
        setSearchClicked,
        setProductType,
        setSubProductType,
        setSearchCity,
        setSearchStreet,
        setSearchRadius,
        productType,
        subProductType,
        searchCity,
        searchRadius,
        searchStreet,
        subProductHeb,
        setSubProductHeb
    } = props;


    const [isCityVisible, setIsCityVisible] = useState(false);
    const [loader, setLoader] = useState(false);


    const handleCityOnChange = (e) => {
        if (e.target.value.length > 0) {
            setIsCityVisible(true);
            setSearchCity(e.target.value)
        } else {
            setIsCityVisible(false);
            setSearchCity("");
        }
    };

    const handleClick = (chosenCity) => {
        setSearchCity(chosenCity);
        setIsCityVisible(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendSearch();
        setLoader(true);

        projectFirestore.collection("ProductSearch")
            .add({
                productType: productType,
                subProductType: subProductType,
                subProductHeb: subProductHeb,
                city: searchStreet,
                street: searchCity,
                radius: searchRadius,
                userId: currentUser
            })
            .then(() => {
                setLoader(false)
            })
            .catch((error) => {
                alert(error.message);
                setLoader(false);
            });
    }

    const sendSearch = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userId: currentUser,
                category: productType,
                subCategory:subProductType,
                userCity: searchCity,
                userStreet:searchStreet,
                range:searchRadius
            })
        };
        const url = "http://127.0.0.1:8000/app/search";
        const response = await fetch(url, requestOptions).then(response => response.json())
            .then(response => (search = response));

    }


    return (
        <div className="search-div">
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="product-search">
                    <div className="product-type-search">
                        <select className="product-options-search" name="productType" value={productType} onChange={(e) => setProductType(e.target.value)} >
                            <option value="placeholder"> קטגורית המוצר</option>
                            <option value="furniture">ריהוט</option>
                            <option value="electronics">מוצרי חשמל</option>
                            <option value="computers">מחשוב</option>
                            <option value="other">שונות</option>
                        </select>
                    </div>
                    <div className="product-type-search">
                        <SubCategories productType={productType}
                                       subProductType={subProductType}
                                       setSubProductType={setSubProductType}
                                       setSubProductHeb={setSubProductHeb}
                        />
                    </div>
                    <div className="search-city">
                        <input type="text" placeholder="עיר" value={searchCity}
                               onChange={(e) => {handleCityOnChange(e)}}
                        />
                        {JSONCITY.location.filter((val) => {
                            if (val.name.includes(searchCity)) {
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
                    <div key="a" className="search-street">
                        <input type="text" placeholder="רחוב" value={searchStreet} onChange={(e) => {setSearchStreet(e.target.value)}}/>
                    </div>
                    <div key="b" className="search-radius">
                        <input type="text" placeholder="רדיוס" value={searchRadius} onChange={(e) => {setSearchRadius(e.target.value)}}/>
                    </div>
                    <button type="submit" className="submit-button" onClick={(e) => setSearchClicked(true)}>
                        חיפוש
                    </button>
                </div>
            </form>
        </div>
    )
};

export default SearchComponent
