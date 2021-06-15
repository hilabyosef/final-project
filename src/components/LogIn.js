import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import fire from "firebase";
import './LogIn.css'
import UseSearch from "./handleSearch";

const LogIn = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [forgotPassword, setForgotPassword] = useState(false);
    const [checkMail, setCheckMail] = useState(false);
    const history = useHistory();

    const { docs } = UseSearch('ImagesUI');
    const handleLogIn = async (e) => {
        e.preventDefault();
        if (fire) {
            await fire.auth().signInWithEmailAndPassword(email, password).then(
                () => {
                    setEmail('');
                    setPassword('');
                    history.push('/Home');
                }
            );
        }
    }

    const handleForgotPassword = async(e) => {
        e.preventDefault();
        console.log(email)
        await fire.auth().sendPasswordResetEmail(email)
            .then(function (user) {
                setCheckMail(true);
            }).catch(function (e) {
                console.log(e)
            })
    }

    const handleDisplayForms = () => {
        setForgotPassword(true);
    }

    const handleGotMail = () => {
        setForgotPassword(false);
        setCheckMail(false);
    }

    return (
        <div className="logInContainer">
            <div className="logInText">
                <h1 className="logInH2">התחברות לאתר</h1>
                <Link className="newUser" to="/SignUp">משתמש חדש? ליצירת חשבון</Link>
                <form className="logInForm" onSubmit={handleLogIn}>
                    <div className="logInInputs">
                        <input type="text" value={email} onChange={e => setEmail(e.currentTarget.value)} placeholder="כתובת מייל"/>
                        <br/>
                        <input type="password" value={password} onChange={e => setPassword(e.currentTarget.value)} placeholder="סיסמה"/>
                        <br/>
                    </div>
                    <button className="logInBtn" type="submit">התחברות</button>
                </form>
                <button className="forgotPasswordBtn" onClick={handleDisplayForms}>שכחתי סיסמא</button>
                <br/>
                {forgotPassword &&
                <div className="forgotPasswordContainer">
                    <div className="forgotPasswordText">
                        <h2 className="forgotPasswordH2">?שכחת סיסמא</h2>
                        <form className="forgotPasswordForm" onSubmit={handleForgotPassword}>
                            <input className="forgotPasswordEmailInput" type="text" value={email} onChange={e => setEmail(e.currentTarget.value)} placeholder="כתובת אימייל"/>
                            <br />
                            {!checkMail &&<input className="forgotPasswordSubmit" type="submit" value="איפוס סיסמא"/>}
                        </form>
                        {checkMail &&
                        <div className="passwordReset">
                            <h5 className="forgotPasswordH5">הסיסמא החדשה נשלחה לתיבת המייל שלך</h5>
                            <button className="reLogIn" onClick={handleGotMail}>התחברות מחדש</button>
                        </div>}
                    </div>
                    <div className="forgotPasswordImage">
                        { docs && docs.map(doc => (
                            (doc['description'] === "forgot-password") && <img className="forgot-password-image-div" src={doc.imageURL}/>
                        ))}
                    </div>

                </div>
                }
            </div>
            <div className="logInImage">
                { docs && !forgotPassword && docs.map(doc => (
                    (doc['description'] === "log-in-image") && <img className="log-in-image-div" src={doc.imageURL}/>
                ))}

            </div>
        </div>


    )
}

export default LogIn
