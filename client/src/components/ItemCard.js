import React, { useEffect, useState } from "react";
import { Card, Icon, Image } from 'semantic-ui-react'


function ItemCard({ item }) {


    return (

        <Card>
        <Image src={item.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{item.name}</Card.Header>
          <Card.Description>${item.price}</Card.Description>
        </Card.Content>
        <Card.Content extra>

            <Icon name='details' />
            View Details
        </Card.Content>
      </Card>

    )
}

export default ItemCard;