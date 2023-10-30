import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { Card } from 'semantic-ui-react'
import { useFetchItemsQuery } from '../store';
import CartList from "./CartList";

function Cart({ }) {

    const { data, error, isLoading } = useFetchItemsQuery();

    return (

        <div style={{ margin: "30px"}}>
            <h3>Shopping Cart</h3>
            <CartList />
        </div>
    )
}

export default Cart;