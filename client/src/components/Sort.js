import React, { useEffect, useState, useMemo } from "react";
import { useFetchItemsQuery } from '../store';

function Sort() {
    const {
      data: items = [],
      isLoading,
      isSuccess,
      isError,
      error
    } = useFetchItemsQuery()
  
    const sortedItems = useMemo(() => {
      const sortedItems = items.slice()
      sortedItems.sort((item1, item2) => 
      item2.price - item1.price)
      return sortedItems
    }, [items])
  
    console.log(sortedItems) 
let content

if (isLoading) {
    content = <div text="Loading..." />
  } else if (isSuccess) {
    content = sortedItems.map(item => <div key={item.id} item={item} />)
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section>
      <h2>Items</h2>
      {content}
    </section>
  )
}

export default Sort;