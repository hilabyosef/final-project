import React, {useState} from 'react';
import Axios from 'axios';
import './image-grid.css';
import SearchComponent from './searchComponent'
import UseSearch from "./handleSearch";
import Module from './ImageModule'
import {Link} from "react-router-dom";


const ImageGrid = () => {

    const [productType, setProductType] = useState("");
    const [subProductType, setSubProductType] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [searchStreet, setSearchStreet] = useState("");
    const [searchRadius, setSearchRadius] = useState("");
    const [subProductHeb, setSubProductHeb] = useState("");
    const [searchClicked, setSearchClicked] = useState(false);
    const [isToggled, setIsToggled] = useState(false);
    const [ selectedImg, setSelectedImg ] = useState(null);


    const { docs } = UseSearch('Products', searchClicked, productType, subProductType, searchCity);

    async function getApi(e)  {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userStreet: 'הזכוכית 12',
                userCity: 'חדרה',
                range: 200
            })
        };
        await fetch('http://127.0.0.1:8000/app/products_for_user', requestOptions)
            .then(response => console.log(response.json()))
            .then(data => console.log(data));

        // e.preventDefault()
        // Axios.post("http://127.0.0.1:8000/app/products_for_user", {
        //     userStreet: "הזכוכית 12",
        //     userCity: "חדרה",
        //     range: 200
        //
        // }).then(res => {
        //     console.log(res.data)
        // })
    }

    return (
        <div>
            <div className="img-grid">
                <SearchComponent setSearchClicked={setSearchClicked}
                                 setProductType={setProductType}
                                 setSubProductType={setSubProductType}
                                 setSearchCity={setSearchCity}
                                 setSearchStreet={setSearchStreet}
                                 setSearchRadius={setSearchRadius}
                                 productType={productType}
                                 subProductType={subProductType}
                                 searchCity={searchCity}
                                 searchStreet={searchStreet}
                                 searchRadius={searchRadius}
                                 subProductHeb={subProductHeb}
                                 setSubProductHeb={setSubProductHeb}
                />
                <div className="sort-by-container">
                   בחר אפשרות סינון מוצרים
                   <select className="sort-selection" onChange={getApi}>
                       <option className="placeholder"></option>
                       <option className="sort-option">מומלצים ביותר</option>
                       <option className="sort-option">מרחק</option>
                   </select>
                </div>
                <div className="product-container">
                    <div className="recommended-items-algo">
                        { docs && docs.map(doc => (
                            <div className="wrap">
                                <div className="container">
                                    <img className="img" src={doc.imageURL} onClick={() => setSelectedImg(doc.imageURL)}/>
                                    {selectedImg && <Module selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>}
                                    <div className="button-line">
                                        <div className="upload-time">{doc.uploadTime}</div>
                                        <div className="distance"> 2km</div>
                                        <div className="address">{doc.city}, {doc.streetNum}</div>
                                        <div className="category">{doc.subProductHeb}</div>
                                        <Link className="contact-seller" to={{
                                            pathname: "/ContactSeller",
                                            state: {
                                                givingUserId: doc.userID,
                                                productId: doc.id
                                            }
                                        }}>צור קשר</Link>
                                        <div className="description">{doc.description}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageGrid;
