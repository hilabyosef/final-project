import React from 'react';
import { fire, projectFirestore } from "../firebase";



const Module = ( props ) => {
    const {selectedImg, setSelectedImg, docs, currentUser} = props;


    const clicksCounter = (clicks, id) => {
        let counter = clicks + 1;
        projectFirestore.collection('Products').doc(id).update({
            clicks: counter
        });
    }

    const handleClick = (e) => {
        if (e.target.classList.contains('backdrop')) { //only if we click on the background will the enlarged image close
            console.log(selectedImg)
            Object.values(docs).map(doc => (
                doc.imageURL === selectedImg ?
                    clicksCounter(doc.clicks, doc.id)
                    : 'null'
            ));
            setSelectedImg(null);
        }
    };
    return (
        <div className="backdrop" onClick={handleClick}>
            <img src={selectedImg} alt="enlarged pic"/>
        </div>
    )
};

export default Module
