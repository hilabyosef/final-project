import { useState, useEffect } from 'react';
import { projectFirestore } from "../firebase";

const UseSearch = (collection, searchClicked, productType, subProductType, searchCity, searchStreet, searchRadius) => { //taking in a collection from which we want our images from
    const [ docs, setDocs ] = useState([]); // begins with empty array cuz we don't have any docs to begin with

    useEffect(() => {//passing a callback function that will fire whenever the dependencies change
        const unsub = projectFirestore.collection(collection)
            .orderBy('uploadTime', 'desc')
            .onSnapshot((snap) => { //fires callback function everytime a change occurs inside this collection
                    let documents = [];
                    snap.forEach( doc => {
                        const data = doc.data();
                        if (data.isAvailable) {
                            if (searchClicked) {
                                if (productType && !subProductType && !searchCity && !searchStreet) {
                                    if (data.productType === productType) {
                                        documents.push({...doc.data(), id: doc.id});
                                    }
                                } else if (productType && subProductType && !searchCity && !searchStreet) {
                                    if ((data.productType === productType
                                        && data.subProductType === subProductType)) {
                                        documents.push({...doc.data(), id: doc.id});
                                    }
                                } else if (productType && !subProductType && searchCity && !searchStreet) {
                                    if ((data.productType === productType
                                        && data.subProductType === subProductType && data.city === searchCity)) {
                                        documents.push({...doc.data(), id: doc.id});
                                    }
                                } else if (productType && !subProductType && searchCity && searchStreet ) {
                                    if ((data.productType === productType
                                        && data.subProductType === subProductType && data.city === searchCity)) {
                                        documents.push({...doc.data(), id: doc.id});
                                    }
                                }

                            } else {
                                documents.push({...doc.data(), id: doc.id});
                            }
                        }

                    });
                    setDocs(documents);
                }
            );
        return  () => unsub(); // unsubscribe from collection when we no longer use it
    }, [collection, searchClicked, productType, subProductType, searchCity]);

    return { docs }
}

export default UseSearch
