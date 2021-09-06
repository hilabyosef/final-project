import React, {useState} from 'react';
import './image-grid.css';
import SearchComponent from './searchComponent'
import UseSearch from "./handleSearch";
import Module from './ImageModule'
import {fire, projectFirestore} from "../firebase";
import {Link} from "react-router-dom";
import UseDistance from './handleFilter'
import ScaleLoader from "react-spinners/ScaleLoader";
import HandleMost from './handleMost'

const ImageGrid = () => {

    const [productType, setProductType] = useState("");
    const [subProductType, setSubProductType] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [searchStreet, setSearchStreet] = useState("");
    const [searchRadius, setSearchRadius] = useState("");
    const [subProductHeb, setSubProductHeb] = useState("");
    const [searchClicked, setSearchClicked] = useState(false);
    const [ selectedImg, setSelectedImg ] = useState(null);
    const [filter, setFilter] = useState(false);
    const [filteredData, setFilteredData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isMost, setIsMost] = useState(false);

    const [currentUser, setCurrentUser] = useState('');
    const [currentCity, setCurrentCity] = useState('');
    const [currentStreet, setCurrentStreet] = useState('');
    let [color, setColor] = useState("#DE747C");

    fire.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
            setCurrentUser(authUser.uid);
        } else {
            setCurrentUser('');
        }
    });

    projectFirestore.collection('testCreateUser').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            if (doc.id === currentUser) {
                setCurrentCity(doc.data().city);
                setCurrentStreet(doc.data().streetNum);
            }
        })
    })


    let { docs } = UseSearch('Products', searchClicked, productType, subProductType, searchCity, searchStreet, searchRadius,setLoading, currentUser, currentStreet,currentCity);
    let { data } = UseDistance(currentUser, currentCity, currentStreet, setLoading);
    let { most } = HandleMost(currentUser, isMost);
    console.log(most);

    const getApi = (e) => {
        setFilter(!filter);
        setIsMost(!isMost);
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
                    בחר אפשרות סידור מוצרים
                    <select className="sort-selection" onChange={e => getApi(e)}>
                        <option className="sort-option">מרחק</option>
                        <option className="sort-option">מומלצים ביותר</option>
                    </select>
                </div>
                <div className="product-container">
                    {loading ?
                        <div className="loading">
                            <ScaleLoader color={color} loading={loading} size={80} />
                        </div>
                        :
                        <div className="recommended-items-algo">
                            {filter ?
                                Object.keys(most).length > 0 && docs && Object.values(most).map(mo => (
                                    docs.map(doc => (
                                        (mo === doc.id) && <div className="wrap">
                                            <div className="container">
                                                <img className="img" src={doc.imageURL}
                                                     onClick={() => setSelectedImg(doc.imageURL)}/>
                                                {doc.clicks > 10 && <div className="wanted-product">מוצר מבוקש</div>}
                                                {selectedImg &&
                                                <Module selectedImg={selectedImg} setSelectedImg={setSelectedImg}
                                                        doc={{...doc}}/>}
                                                <div className="button-line">
                                                    <div className="upload-time">{doc.uploadTime}</div>
                                                    <div
                                                        className="distance"> {data[doc.id] ? Math.ceil(data[doc.id]) : ''}km
                                                    </div>
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
                                    ))
                                )) :
                                (Object.keys(data).length > 0 ?
                                    docs && Object.keys(data).map(x => (
                                        docs.map(doc => (
                                            (x === doc.id) && <div className="wrap">
                                                <div className="container">
                                                    <img className="img" src={doc.imageURL}
                                                         onClick={() => setSelectedImg(doc.imageURL)}/>
                                                    {doc.clicks > 3 && <div className="wanted-product">מוצר מבוקש</div>}
                                                    {selectedImg &&
                                                    <Module selectedImg={selectedImg} setSelectedImg={setSelectedImg}
                                                            docs={{...docs}}/>}
                                                    <div className="button-line">
                                                        <div className="upload-time">{doc.uploadTime}</div>
                                                        <div
                                                            className="distance"> {data[doc.id] ? Math.ceil(data[doc.id]) : ''}km
                                                        </div>
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
                                        ))
                                    )) :
                                    docs.map(doc => (
                                            <div className="wrap">
                                                <div className="container">
                                                    <img className="img" src={doc.imageURL}
                                                         onClick={() => setSelectedImg(doc.imageURL)}/>
                                                    {doc.clicks > 3 && <div className="wanted-product">מוצר מבוקש</div>}
                                                    {selectedImg &&
                                                    <Module selectedImg={selectedImg} setSelectedImg={setSelectedImg}
                                                            docs={{...docs}}/>}
                                                    <div className="button-line">
                                                        <div className="upload-time">{doc.uploadTime}</div>
                                                        <div
                                                            className="distance"> {data[doc.id] ? Math.ceil(data[doc.id]) : 2}km
                                                        </div>
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
                                        )
                                    ))

                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ImageGrid;
