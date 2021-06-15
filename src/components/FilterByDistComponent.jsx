import React, {useState} from 'react';
import UseFirestore from '../hooks/useFirestore'
import UseSearch from "./handleSearch";




const FilterByDistComponent = () => {
    const { docs } = UseFirestore('Products');

    return (
        <div className="distance-filtered-items">
            { docs && docs.map(doc => (
                <div className="item-container-dist">
                    <div className="item-description">
                        <div className="upload-info">
                            <div className="upload-time"> {doc.uploadTime}</div>
                            <div className="upload-dist"> 2KM</div>
                        </div>
                        <div className="upload-desc"> {doc.description} </div>
                    </div>
                    <div className="img-wrap-dist">
                        <img className="item-img-dist" src={doc.imageURL}></img>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FilterByDistComponent

