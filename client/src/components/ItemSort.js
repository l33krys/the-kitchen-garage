import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { Dropdown, Search, Input, Icon } from 'semantic-ui-react'

function ItemSort({ items, loggedInUser, customerOrderItems, categoryPage, setCategoryPage, categoryData, search, setSearch, sortBy, setSortBy, handleSortBy  }) {

    const sortOptions = [
        { key: 1, text: "Best Match", value: "Best Match" }, 
        { key: 2, text: "Price: Low to High", value: "Price: Low to High" }, 
        { key: 3, text: "Price: Hight to Low", value: "Price: High to Low" }
    ]

    return (

        <div style={{ textAlign: "right", marginRight: "140px"}}>
            {/* <Dropdown style={{ }} placeholder='Sort By' search selection options={sortOptions}
                onChange={(e) => handleSortBy(e.target.innerText)}
                /> */}
            <div id="search-container" >
                <Input
                icon="search"
                iconPosition='left'
                type="text"
                id="search-bar"
                placeholder="Search..."
                className="prompt"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            </div>


        </div>
    )
}

export default ItemSort;

