import React from "react";
import { Dropdown, Input } from 'semantic-ui-react'

function ItemSort({ search, setSearch, setSortBy }) {

    const sortOptions = [
        { key: 1, text: "Best Match", value: "Best Match" }, 
        { key: 2, text: "Price: Low to High", value: "Price: Low to High" }, 
        { key: 3, text: "Price: High to Low", value: "Price: High to Low" }
    ]

    return (

        <div style={{ textAlign: "right", marginRight: "140px"}}>
            <Dropdown 
                defaultValue={sortOptions[0].value} 
                placeholder='Sort By' 
                search 
                selection 
                options={sortOptions}
                onChange={(e) => setSortBy(e.target.innerText)}
                />
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

