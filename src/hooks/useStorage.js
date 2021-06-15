import { useEffect, useState } from 'react';
import { projectFirestore, projectStorage, timestamp } from "../firebase";

const useStorage = (file) => {
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        // references
        const storageRef = projectStorage.ref(file.name);
        const collectionRef = projectFirestore.collection('images');

        storageRef.put(file).on('state_changed', (snap) => {
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await storageRef.getDownloadURL(); //gets the url from the file we uploaded and saves to the const
            const createdAt = timestamp();
            await collectionRef.add({ url, createdAt });
            setUrl(url);
            //takes a file and put in the refference (the location). this is async so need to pass event listener
        });
    }, [file]); /* the logic inside useEffect will fire every time file changes*/
    return {url , error};
};

export default useStorage;
