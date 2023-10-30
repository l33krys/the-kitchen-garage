import React, { useState } from 'react'
import {useParams} from "react-router-dom"
import { Grid, Image } from 'semantic-ui-react'
import { useFetchItemsQuery } from '../store';
import { useSelector } from 'react-redux';

function ItemDetails() {
    const [selectedItem, setSelectedItem] = useState({})

    const { data, error, isLoading } = useFetchItemsQuery();
    const {itemId} = useParams()

    // const itemDetails = useSelector(state =>
    //     state.data.find(item => item.id === itemId)
    //   )
      
    //   data.find(item => item.id === itemId)


    return (
        data ? (<Grid>
            <Grid.Column width={4}>
              <Image />
              <h2>Item Details for {itemId} </h2>
            </Grid.Column>
            <Grid.Column width={9}>
              <Image />
            </Grid.Column>
          </Grid>) : "No"
        
    
    )
}

export default ItemDetails;