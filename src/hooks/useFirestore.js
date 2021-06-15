import { useState, useEffect } from 'react';
import { projectFirestore } from "../firebase";

const UseFirestore = (collection) => { //taking in a collection from which we want our images from
    const [ docs, setDocs ] = useState([]); // begins with empty array cuz we don't have any docs to begin with

    useEffect(() => {//passing a callback function that will fire whenever the dependencies change
        const unsub = projectFirestore.collection(collection)
            // .orderBy('createdAt', 'desc')
            .onSnapshot((snap) => { //fires callback function every time a change occurs inside this collection
                    let documents = [];
                    snap.forEach( doc => { //cycle through docs inside the database collection at the moment in time we get the snapshot (snapshot of  the db in that moment in time)
                        documents.push({...doc.data(), id: doc.id}); // ... is get all from data
                    });
                    setDocs(documents);
                }
            );
        return  () => unsub(); // unsubscribe from collection when we no longer use it
    }, [collection]);

    return { docs }
}

export default UseFirestore
