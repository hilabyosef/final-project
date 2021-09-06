import { useState, useEffect } from 'react';
import { projectFirestore } from "../firebase";
import UseFilter from "./handleRadius";

const UseSearch = (collection, searchClicked, productType, subProductType, searchCity, searchStreet, searchRadius,setLoading, currentUser, currentStreet,currentCity) => { //taking in a collection from which we want our images from
    const [ docs, setDocs ] = useState([]); // begins with empty array cuz we don't have any docs to begin with
    let distArr = [];

    let { dist } = UseFilter(currentUser, currentCity, currentStreet, setLoading);

    useEffect(() => {//passing a callback function that will fire whenever the dependencies change
        const unsub = projectFirestore.collection(collection)
            .orderBy('uploadTime', 'desc')
            .onSnapshot((snap) => { //fires callback function everytime a change occurs inside this collection
                    let documents = [];
                    snap.forEach( doc => {
                        const data = doc.data();
                        if (data.isAvailable) {
                            if (searchClicked) {
                                if (productType && !subProductType && !searchCity && !searchStreet && !searchRadius) { //only product
                                    if (data.productType === productType) {
                                        documents.push({...doc.data(), id: doc.id});
                                    }
                                } else if (productType && subProductType && !searchCity && !searchStreet && !searchRadius) { // product + sub product
                                    if ((data.productType === productType
                                        && data.subProductType === subProductType)) {
                                        documents.push({...doc.data(), id: doc.id});
                                    }
                                } else if (productType && subProductType && searchCity && !searchStreet && !searchRadius) { //product + sub product + city
                                    if ((data.productType === productType
                                        && data.subProductType === subProductType && data.city === searchCity)) {
                                        documents.push({...doc.data(), id: doc.id});
                                    }
                                } else if (productType && subProductType && searchCity && searchStreet && !searchRadius) { //product + sub product + city + street
                                    if ((data.productType === productType
                                        && data.subProductType === subProductType && data.city === searchCity && (data.streetNum.indexOf(searchStreet) > -1))) {
                                        documents.push({...doc.data(), id: doc.id});
                                    }

                                } else if (productType && subProductType && searchCity && !searchStreet && searchRadius) { //product + sub product + city + radius
                                    if ((data.productType === productType
                                        && data.subProductType === subProductType && data.city === searchCity && (dist[doc.id] < searchRadius))) {
                                        documents.push({...doc.data(), id: doc.id});
                                    }

                                }  else if (productType && subProductType && searchCity && searchStreet && searchRadius) { //product + sub product + city + street + radius
                                    if ((data.productType === productType
                                        && data.subProductType === subProductType && data.city === searchCity && (dist[doc.id] < searchRadius) && (dist[doc.id] < searchRadius))) {
                                        documents.push({...doc.data(), id: doc.id});
                                    }

                                }
                                else if (!productType && !subProductType && !searchCity && !searchStreet && searchRadius) { //radius
                                    if (dist[doc.id] < searchRadius) {
                                        documents.push({...doc.data(), id: doc.id});
                                    }
                                } else if (!productType && !subProductType && searchCity && !searchStreet && !searchRadius) {//city
                                    if ((data.city === searchCity)) {
                                        documents.push({...doc.data(), id: doc.id});
                                    }

                                } else if (!productType && !subProductType && searchCity && !searchStreet && !searchRadius) { //city + radius
                                    if ((data.city === searchCity && (dist[doc.id] < searchRadius))) {
                                        documents.push({...doc.data(), id: doc.id});
                                    }

                                } else if (productType && !subProductType && !searchCity && !searchStreet && searchRadius) { //product + radius
                                    if ((data.productType === productType && (dist[doc.id] < searchRadius))) {
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
