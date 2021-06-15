import React, {useState, useEffect} from 'react';
import { fire, projectFirestore, timestamp } from "../firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ContactSeller from "./ContactSeller"

const Home = () => {

    const [products, setProducts] = useState([]);


    useEffect(() => {
        //load hospitals into hospitalsList
        const tempProducts = []
        projectFirestore.collection('Products').get()
            .then(snapshot => {
                snapshot.docs.forEach(product => {
                    let currentID = product.id
                    let appObj = { ...product.data(), ['id']: currentID }
                    tempProducts.push(appObj)

                    // products.push(product.data())
                })
                setProducts(tempProducts)
            })
    },[])
    console.log(products)

    return (
        <div>
            {products.map((product, key) => {
                return (
                        <div>
                            <h1>{key}</h1>
                            <p>{product.givingUser}</p>
                            {console.log(`product id: ${product.id}`)}
                            <Link to={{
                                pathname: "/ContactSeller",
                                state: {
                                    givingUserId: product.givingUser,
                                    productId: product.id
                                }
                            }}>contact seller</Link>
                        </div>
                )
            })}
        </div>
    )
}

export default Home
