import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { Card } from 'semantic-ui-react'
import { useFetchItemsQuery } from '../store';

function Cart({ }) {

    const { data, error, isLoading } = useFetchItemsQuery();

    return (

        <div>
            <h3>Shopping Cart</h3>
        </div>
    )
}

export default Cart;