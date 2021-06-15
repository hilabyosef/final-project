import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { fire, projectFirestore, timestamp } from "../firebase";
import Autocomplete from "./autocomplete";
import './SignUp.css'
import UseSearch from "./handleSearch";
import HandleRecs from './handleRecs'

const SignUp = () => {

    const [currentUser, setCurrentUser] = useState('');
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [city, setCity] = useState('');
    const [streetNum, setStreetNum] = useState('');
    const [street, setStreet] = useState('');
    const [houseNr, setHouseNr] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const { docs } = UseSearch('ImagesUI');
    const {recs} = HandleRecs(currentUser);

    const updateFirestore = () => {
        let docRef= projectFirestore.collection('testCreateUser').doc(currentUser);
        docRef.get().then(doc => {
            if (!doc.exists) {
                docRef.set({
                    nickname: name,
                    email: email,
                    password: password,
                    city: city,
                    streetNum: streetNum,
                    houseNum: houseNr
                }).then(() => {
                    console.log("document created");
                    setName('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setCity('');
                    setStreet('');
                    setStreetNum('');
                    setHouseNr('');
                    fire.auth().signInWithEmailAndPassword(email, password).then(() => {
                        console.log("sign in");
                    })
                })
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            fire.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
                let user = userCredential.user;
                setCurrentUser(user.uid);
                history.push('/Home');
            }).catch(error => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        console.log("email address already used");
                        setError('קיים כבר משתמש על כתובת מייל זו')
                        break;
                    case 'auth/invalid-email':
                        console.log("invalid email address");
                        setError("כתובת מייל לא חוקית");
                        break;
                }
            })
        }
    }

    return (
        <div className="sign-up-container">
            <div className="text">
                {currentUser ? updateFirestore() : null}
                <h1 className="sign-up-h1">!הצטרפו אלינו והתחילו למחזר</h1>
                <form className="sign-up-form" onSubmit={handleSubmit}>
                    <div className="sign-up-inputs">
                        <input type="text" value={name} onChange={e => setName(e.currentTarget.value)} placeholder="שם/כינוי"/>
                        <input type="text" value={email} onChange={e => setEmail(e.currentTarget.value)} placeholder="כתובת מייל"/>
                        <input type="password" value={password} onChange={e => setPassword(e.currentTarget.value)} placeholder="סיסמא"/>
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.currentTarget.value)} placeholder="אימות סיסמא"/>
                    </div>
                    <div className="sign-up-city">
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
                    <div className="sign-up-errors">
                        {error}
                    </div>
                    <button className="submit-btn" type="submit">
                        הרשמה
                    </button>
                </form>
            </div>
            <div className="image">
                { docs && docs.map(doc => (
                    (doc['description'] === "sign-up-image") && <img className="sign-up-image" src={doc.imageURL}/>
                ))}
            </div>
        </div>




    );
}

export default SignUp;
