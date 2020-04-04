import React, { useEffect, useState } from 'react';
import './App.css';
import { Link } from "react-router-dom";

function Shop() {

    useEffect(() => {
        fetchItem();
    },[]);

    const fetchItem = async () => {
        const fetchItem = await fetch(`https://fortnite-api.theapinetwork.com/item/get?id=cab199d-b326395-0c1a1d8-e1cf251`);
        const item = await fetchItem.json();
        console.log(item);
    }

    const[item, setItem] = useState({});

    return (
        <div>
           <h1>Item</h1>
        </div>
    );
}

export default Shop;