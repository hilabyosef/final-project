import React from 'react';
import { projectFirestore } from "../firebase";



const Module = ( props ) => {
    const {selectedImg, setSelectedImg, doc, currentUser} = props;
    const handleClick = (e) => {
        if (e.target.classList.contains('backdrop')) { //only if we click on the background will the enlarged image close
            setSelectedImg(null);
            let clicksCounter = doc.clicks + 1;
            projectFirestore.collection('Products').doc(doc.id).update({
                clicks: clicksCounter
            })
        }
    };
    return (
        <div className="backdrop" onClick={handleClick}>
            <img src={selectedImg} alt="enlarged pic"/>
        </div>
    )
};

export default Module