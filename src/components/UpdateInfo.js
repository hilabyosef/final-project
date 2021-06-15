import {fire, projectFirestore} from "../firebase";
import React, { useEffect, useState } from "react";
import Autocomplete from "./autocomplete";
import "./UpdateInfo.css"
import UseSearch from "./handleSearch";

const UpdateInfo = () => {
    const [userid, setUserid] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [city, setCity] = useState('');
    const [streetNum, setStreetNum] = useState('');
    const [street, setStreet] = useState('');
    const [houseNr, setHouseNr] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [updatePasswordClicked, setUpdatePasswordClicked] = useState(false);
    const [imgURL, setImgURL] = useState('');

    const { docs } = UseSearch('Products');

    fire.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
            setUserid(authUser.uid);
            setLoaded(true);

        } else {
            setUserid('');
        }
    });

    useEffect(() => {
        projectFirestore.collection('testCreateUser').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                if (doc.id === userid) {
                    const currentNickname = doc.data().nickname;
                    const currentEmail = doc.data().email;
                    const currentPassword = doc.data().password;
                    const currentCity = doc.data().city;
                    const currentStreet = doc.data().streetNum.slice(0, -3);
                    const currentNum = doc.data().streetNum.slice(-3);
                    setNickname(currentNickname);
                    setEmail(currentEmail);
                    setCurrentPassword(currentPassword);
                    setCurrentEmail(currentEmail);
                    setCity(currentCity);
                    setStreet(currentStreet);
                    setHouseNr(currentNum);
                }
            })
        })
        projectFirestore.collection('ImagesUI').doc('XReHpcqHVT5LEZPvBGtU').get().then((doc) => {
            const tempImg = doc.data().imageURL;
            setImgURL(tempImg)
        })
        console.log(imgURL)

    }, [loaded])



    const handleSubmit = (e) => {
        e.preventDefault();
        projectFirestore.collection('testCreateUser').doc(userid).update({
            nickname: nickname,
            email: email,
            city: city,
            streetNum: streetNum,

            }
        ).then( () => {
            setNickname('');
            setEmail('');
            setCurrentEmail('');
            setCity('');
            setStreetNum('');
            setHouseNr('');
            setStreet('');
        })
        if(email !== currentEmail) {
            alert("here");
            fire.auth()
                .signInWithEmailAndPassword(currentEmail, currentPassword)
                .then(function(userCredential) {
                    userCredential.user.updateEmail(email);
        })
        }
        if (password) {
            if (password === confirmPassword) {
                let user = fire.auth().currentUser;
                user.updatePassword(password).then(() => {
                    alert("password was changed")
                }).catch((error) => console.log(error))
            }
        }
    }

    const handleProductDelivered = (e) => {
        let productId = e.target.value;
        projectFirestore.collection('Products').doc(productId).update({
            isAvailable: false
    })
    }

    return (
        <div className="updateDetailsContainer">
            <div className="updateInfoContainer">
                <div className="updateInfoText">
                    <h1 className="h1UpdateInfo">עדכון פרטים אישיים</h1>
                    <form className="updateInfoForm" onSubmit={handleSubmit}>
                        <div className="updateInfoInputs">
                            <label>כינוי/שם פרטי</label>
                            <input type="text" value={nickname} onChange={e => setNickname(e.target.value) } />
                            <label>כתובת מגורים / נקודת איסוף / נקודת מסירה </label>
                        </div>
                        <div className="autocompleteUpdateInfo">
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
                        <button onClick={() => setUpdatePasswordClicked(!updatePasswordClicked)} className="updatePasswordBtn">שינוי סיסמה</button>
                        {updatePasswordClicked ?
                            <div className="updateInfoInputs">
                                <input type="password" placeholder="סיסמה חדשה" onChange={e => setPassword(e.target.value)}/>
                                <input type="password" placeholder="אימות סיסמא" onChange={e => setConfirmPassword(e.target.value)}/>
                            </div> : null
                        }
                        <br/>
                        <button className="submitUpdates" type="submit">
                            עדכון פרטים
                        </button>
                    </form>
                </div>

                <div className="updateInfoImage">
                     <img className="updateInfoImageDiv" src={imgURL}/>
                </div>

            </div>
            <div className="myProducts">
                <h1>המוצרים שלי</h1>
                {docs && docs.map(product => (
                    <div>
                        {product['userID'] === userid && product['isAvailable'] &&
                        <div className="warpProduct">
                            <div className="productDiv">
                                <p className="descriptionProducts">{product.description}</p>
                                <button onClick={handleProductDelivered} value={product.id} className="productDelivered">המוצר נמסר</button>
                            </div>
                        </div>
                        }
                    </div>

                    )

                )}
            </div>
        </div>

    )
}

export default UpdateInfo;
