import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Switch, Route, NavLink, Link} from "react-router-dom";
import './LandingPage.css'
import UseSearch from "./handleSearch";
import {fire} from "../firebase";


const LandingPage = () => {

    const { docs } = UseSearch('ImagesUI');
    const [currentUser, setCurrentUser] = useState('');


    fire.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
            setCurrentUser(authUser.uid);
        } else {
            setCurrentUser('');
        }
    });


    return (
        <div className="landing-page">
            <div className="main-page">
                <div className="first-container">
                    <div className="first-text">
                        <h1>מנגישים שיתופיות</h1>
                        <h4>שיתוף, מחזור ותרומה נהיים קלים יותר ונגישים יותר בעזרת האלגוריתים החכמים שלנו והפלטפורמה הנוחה שלנו</h4>
                    </div>
                    <div className="laptop-img">
                        { docs && docs.map(doc => (
                            (doc.description === 'landing-page-img') && <img className="landing-image-div" src={doc.imageURL}/>
                        ))}
                    </div>
                    {/*<div className="text-one">*/}
                    {/*    תהנו ממוצרים מותאמים אישית*/}
                    {/*</div>*/}
                    {/*<div className="text-two">*/}
                    {/*    העלו מוצרים שיכולים לשמש אחרים*/}
                    {/*</div>*/}
                    {/*<div className="text-three">*/}
                    {/*    חפשו מוצרים יד שניה באנונימיות*/}
                    {/*</div>*/}
                    <div className={currentUser ? "landing-buttons-hide" : "landing-buttons"}>
                        <button className="landing-sign-in" type="submit" >
                            <Link to={{
                                pathname: "/LogIn"
                            }}>התחברות</Link>
                        </button>
                        <button className="landing-sign-up" type="submit" >
                            <Link to={{
                                pathname: "/SignUp"
                            }}>הרשמה</Link>
                        </button>
                    </div>
                </div>
                <div className="second-container">
                    <div className="wave">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path fill="#F0F0F0" fill-opacity="1" d="M0,256L34.3,250.7C68.6,245,137,235,206,234.7C274.3,235,343,245,411,234.7C480,224,549,192,617,165.3C685.7,139,754,117,823,133.3C891.4,149,960,203,1029,234.7C1097.1,267,1166,277,1234,250.7C1302.9,224,1371,160,1406,128L1440,96L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path>
                        </svg>
                    </div>
                </div>
                <div className="middle-text-container">
                    <div className="text-one">
                        למחזר
                        { docs && docs.map(doc => (
                            (doc.description === 'recycle') && <img className="landing-recycle" src={doc.imageURL}/>
                        ))}
                    </div>
                    <div className="text-two">
                        לחפש
                        { docs && docs.map(doc => (
                            (doc.description === 'search') && <img className="landing-search" src={doc.imageURL}/>
                        ))}
                    </div>
                    <div className="text-three">
                        לתרום
                        { docs && docs.map(doc => (
                            (doc.description === 'box') && <img className="landing-box" src={doc.imageURL}/>
                        ))}
                    </div>
                </div>
                <div className="third-container">
                    <div className="landing-div-map">
                        <div className="landing-map">
                            { docs && docs.map(doc => (
                                (doc.description === 'landing-map') && <img className="landing-map-img" src={doc.imageURL}/>
                            ))}
                        </div>
                        <div className="map-text">
                            <h2>האלגוריתם החכם שלנו ימצא עבורך את המוצרים הקרובים ביותר למיקום הנכחי שלך</h2>
                            <h4>בעזרתו, מסירה וקבלה של מוצרים תהפוך להיות פשוטה הרבה יותר</h4>
                        </div>
                    </div>
                </div>
                <div className="landing-fourth-container">
                    <div className="landing-div-smart">
                        <div className="smart-text">
                            <h2>ככל שתחפש, תמסור ותקח יותר מוצרים שיכולים לשמש אותך, ככה האלגוריתם שלנו ילמד יותר טוב מה להציע לך בגלישה הבאה</h2>
                            <h4>באופן זה, המוצרים יחפשו אותך</h4>
                        </div>
                        <div className="landing-smart">
                            { docs && docs.map(doc => (
                                (doc.description === 'landing-smart') && <img className="landing-smart-img" src={doc.imageURL}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className="landing-first-container">*/}
            {/*    <div className="landing-header-text">*/}
            {/*        <h2>חפשו מוצרים יד שניה</h2>*/}
            {/*        <h2>העלו מוצרים שאין בהם צורך</h2>*/}
            {/*        <h2></h2>*/}
            {/*        <h4>שיתוף, מחזור ותרומה נהיים קלים יותר ונגישים יותר בעזרת האלגוריתים החכמים שלנו והפלטפורמה הנוחה שלנו</h4>*/}
            {/*        <div className={currentUser ? "landing-buttons-hide" : "landing-buttons"}>*/}
            {/*            <button className="landing-sign-in" type="submit" >*/}
            {/*                <Link to={{*/}
            {/*                    pathname: "/LogIn"*/}
            {/*                }}>התחברות</Link>*/}
            {/*            </button>*/}
            {/*            <button className="landing-sign-up" type="submit" >*/}
            {/*                <Link to={{*/}
            {/*                    pathname: "/SignUp"*/}
            {/*                }}>הרשמה</Link>*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="laptop-img">*/}
            {/*        { docs && docs.map(doc => (*/}
            {/*            (doc.description === 'laptop') && <img className="landing-image-div" src={doc.imageURL}/>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="landing-second-container">*/}
            {/*    <div className="wave-container">*/}
            {/*        <div className="wave">*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="landing-div-search">*/}
            {/*    <div className="landing-search">*/}
            {/*        { docs && docs.map(doc => (*/}
            {/*            (doc.description === 'landing-search') && <img className="landing-second-img" src={doc.imageURL}/>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*        <h2>חיפוש</h2>*/}
            {/*    </div>*/}
            {/*    <div className="landing-div-donate">*/}
            {/*    <div className="landing-donate">*/}
            {/*        { docs && docs.map(doc => (*/}
            {/*            (doc.description === 'landing-donation') && <img className="landing-second-img" src={doc.imageURL}/>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*        <h2>תרומה</h2>*/}
            {/*    </div>*/}
            {/*    <div className="landing-div-recycle">*/}
            {/*    <div className="landing-recycle">*/}
            {/*        { docs && docs.map(doc => (*/}
            {/*            (doc.description === 'landing-recycle') && <img className="landing-second-img" src={doc.imageURL}/>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*        <h2>מיחזור</h2>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="landing-third-container">*/}
            {/*    <div className="landing-div-map">*/}
            {/*        <div className="landing-map">*/}
            {/*            { docs && docs.map(doc => (*/}
            {/*                (doc.description === 'landing-map') && <img className="landing-map-img" src={doc.imageURL}/>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*        <div className="map-text">*/}
            {/*            <h2>האלגוריתם החכם שלנו ימצא עבורך את המוצרים הקרובים ביותר למיקום הנכחי שלך</h2>*/}
            {/*            <h4>בעזרתו, מסירה וקבלה של מוצרים תהפוך להיות פשוטה הרבה יותר</h4>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="landing-fourth-container">*/}
            {/*    <div className="landing-div-smart">*/}
            {/*        <div className="smart-text">*/}
            {/*            <h2>ככל שתחפש, תמסור ותקח יותר מוצרים שיכולים לשמש אותך, ככה האלגוריתם שלנו ילמד יותר טוב מה להציע לך בגלישה הבאה</h2>*/}
            {/*            <h4>באופן זה, המוצרים יחפשו אותך</h4>*/}
            {/*        </div>*/}
            {/*        <div className="landing-smart">*/}
            {/*            { docs && docs.map(doc => (*/}
            {/*                (doc.description === 'landing-smart') && <img className="landing-smart-img" src={doc.imageURL}/>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
    )
}

export default LandingPage