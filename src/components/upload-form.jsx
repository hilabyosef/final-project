import React, { useState, useEffect } from "react";
import {projectFirestore, timestamp} from '../firebase';
import { fire } from '../firebase';
import './upload-form.css';
import SubCategories from './handle-sub-categories'
import JSONCITY from "../city_list.json";
import Autocomplete from "./autocomplete";
import UseSearch from "./handleSearch";

const UploadProductForm = () => {
    const [productType, setProductType] = useState("");
    const [subProductType, setSubProductType] = useState("");
    const [description, setDescription] = useState("");
    const [productCondition, setProductCondition] = useState(false);
    const [city, setCity] = useState('');
    const [streetNum, setStreetNum] = useState('');
    const [isSubCatVisible, setIsSubCatVisible] = useState(false);
    const [cityMatch, setCityMatch] = useState([]);
    const [street, setStreet] = useState('');
    const [houseNr, setHouseNr] = useState('');
    const [uploadTime, setUploadTime] = useState('');
    const [isAvailable, setIsAvailable] = useState(true);
    const [subProductHeb, setSubProductHeb] = useState("");
    const [isRadioChecked, setIsRadioChecked] = useState(true);

    const [image, setImage] = useState(null);
    const [imageURL, setImageURl] = useState('');
    const allowdTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    const [successMsgVisible, setSuccessMsgVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState('');


    fire.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
            setCurrentUser(authUser.uid);
        } else {
            setCurrentUser('');
        }
    });


    const handleTimestamp = () => {
        const createDate = new Date();
        const uploadTime = `${createDate.getDate()}/${createDate.getMonth() + 1}`;
        setUploadTime(uploadTime);
    };

    const changeHandler = async (e) => {
        let file = e.target.files[0];
        const storageRef = fire.storage().ref();
        const imageRef = storageRef.child(file.name);
        await imageRef.put(file);
        setImageURl(await imageRef.getDownloadURL());
        handleTimestamp();


        if (file && allowdTypes.includes(file.type)) { //if file chosen and is of right type
            setImage(file);
            setError('');
        } else {
            setImage(null);
            setError('Please choose only png, jpeg or jpg');
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault(); // prevent refresh so won't lose data
        setLoader(true);

        projectFirestore.collection("Products")
            .add({
                imageURL: imageURL,
                productType: productType,
                subProductType: subProductType,
                subProductHeb: subProductHeb,
                description: description,
                productCondition: productCondition,
                city: city,
                streetNum: streetNum,
                uploadTime: uploadTime,
                isAvailable: isAvailable,
                userID: currentUser,
                clicks: 0
            })
            .then(() => {
                setLoader(false)
                setSuccessMsgVisible(true);
                setTimeout(() => {
                    setSuccessMsgVisible(false)
                }, 3000);
            })
            .catch((error) => {
                alert(error.message);
                setLoader(false);
            });

        setProductType("");
        setSubProductType("");
        setDescription("");
        setProductCondition(false);
        setCity('');
        setStreetNum('null');
        setImageURl("");
        setImage(null);
        setStreet('');
        setHouseNr('');
        setUploadTime('');
        setSubProductHeb('');

    };


    const twoFunction = (e) => {
        setProductType(e.target.value);
        setIsSubCatVisible(true);
    };

    const searchCity = (e) => {
        let match = JSONCITY.location.filter((val) => {
            if (val.name.includes(e)) {
                return val
            } else if (e === "") {
                return setCityMatch([])
            }
        });
        setCityMatch(match)
    };

    // const handleCurrentLocation = async () => {
    //     setIsRadioChecked(!isRadioChecked);
    //     if (isRadioChecked) {
    //         await projectFirestore.collection('testCreateUser').get().then((snapshot) => {
    //             snapshot.docs.forEach(doc => {
    //                 if (doc.id === currentUser) {
    //                     const currentCity = doc.data().city;
    //                     const currentStreet = doc.data().streetNum.slice(0, -2);
    //                     const currentNum = doc.data().streetNum.slice(-2);
    //                     setCity(currentCity);
    //                     setStreet(currentStreet);
    //                     setHouseNr(currentNum);
    //                 }
    //             })
    //         })
    //     } else {
    //         setCity('');
    //         setStreet('');
    //         setHouseNr('');
    //     }
    //
    // }

    const handleCurrentLocation = async () => {
        setIsRadioChecked(!isRadioChecked);
        if (isRadioChecked) {
            await projectFirestore.collection('testCreateUser').get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    if (doc.id === currentUser) {
                        const currentCity = doc.data().city;
                        const currentStreet = doc.data().streetNum.slice(0, -3);
                        const currentNum = doc.data().streetNum.slice(-3);
                        setCity(currentCity);
                        setStreet(currentStreet);
                        setHouseNr(currentNum);
                    }
                })
            })
        } else {
            setCity('');
            setStreet('');
            setHouseNr('');
        }

    }

    return (
        <div className="form-container">
            <div className="style-container">
                <div className="image-container">
                </div>
            </div>
            <form className="upload-form" onSubmit={handleSubmit}>
                <h1 className="form-title">העלאת מוצרים</h1>
                <div className="img-upload-div">
                    <label>העלאת תמונות</label>
                    <input id="img-file-hide" type="file" hidden onChange={ changeHandler }/>
                    <label for="img-file-hide" className="form-label, upload-btn"> בחר תמונות </label>
                    <div className="output">
                        { error && <div className="error">{ error }</div> }
                        { image && <div className="output-img-name">{ image.name }</div> }
                    </div>
                </div>

                <div className="product-type-selection">
                    <div className="product-type">
                        <h4 className="form-label" >קטגורית המוצר</h4>
                        <select required className="product-options" name="productType" value={productType} onChange={twoFunction} >
                            <option value="placeholder"> </option>
                            <option value="furniture">ריהוט</option>
                            <option value="electronics">מוצרי חשמל</option>
                            <option value="computers">מחשוב</option>
                            <option value="other">שונות</option>
                        </select>
                    </div>
                    <div className="product-type">
                        { productType ?
                            <>
                                <label className="form-label">תת-קטגרוית המוצר </label>
                                <SubCategories productType={productType}
                                               subProductType={subProductType}
                                               setSubProductType={setSubProductType}
                                               setSubProductHeb={setSubProductHeb}
                                />
                            </>
                            : null  }
                    </div>
                </div>



                <div className="product-state-container">
                    <h4 className="form-label">מצב המוצר</h4>
                    <select required className="product-options" id="product-condition" name="productCondition" value={productCondition}
                            onChange={(e) => setProductCondition(e.target.value)}>
                        <option value="placeholder"> </option>
                        <option value="like new">כמו חדש</option>
                        <option value="kept well">שמור</option>
                        <option value="used">משומש</option>
                    </select>
                </div>

                <div className="pickup-label">
                    <label>מקום איסוף</label>
                </div>
                <div className="pickup-location-container">
                    <Autocomplete city={city}
                                  setCity={setCity}
                                  streetNum={streetNum}
                                  setStreetNum={setStreetNum}
                                  street={street}
                                  setStreet={setStreet}
                                  houseNr={houseNr}
                                  setHouseNr={setHouseNr}
                    />
                </div>
                <div className="pickup-current-location">
                    <label>בחר במיקום המוגדר שלי כמיקום איסוף</label>
                    <input type="checkbox" onChange={handleCurrentLocation}/>
                </div>
                <div className="form-field-container">
                    <label className="form-label"></label>
                    <textarea required
                              placeholder="תיאור המוצר"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}>
            </textarea>
                </div>

                <div className="submission-div">
                    <button className="form-upload-submit-btn" type="submit" style={{background: loader ? '#ccc' : '#79D493'}}>
                        העלאה
                    </button>
                    <div>
                        {
                            successMsgVisible ? <h4 className={"success-msg"}>המוצר הועלה בהצלחה</h4> : null
                        }
                    </div>
                </div>
            </form>
        </div>

    );
};

export default UploadProductForm;
