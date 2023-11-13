#!/usr/bin/env python3

# Standard library imports
from random import choice as rc, randint, sample

# Remote library imports

# Local imports
from app import app
from models import db, Customer, Address, Item, OrderItem, Order
from items import *
from addresses import *

def create_order():
    orders = []
    for _ in range(8):
        o = Order(
            status = "submitted",
            customer_id = rc(customers).id,
            shipping = 4.99,
            total = 4.99
        )
        orders.append(o)
    return orders

def create_order_item():
    order_items = []
    for _ in range (20):
        order_item = rc(item_list)
        oi = OrderItem(
            item_id = order_item.id,
            quantity = 1,
            order_id = rc(orders).id
        )
        order_items.append(oi)
    return order_items


if __name__ == '__main__':
    
    with app.app_context():
        print("Starting seed...")

        # Clear previous seeding
        Item.query.delete()
        Address.query.delete()
        Customer.query.delete()
        OrderItem.query.delete()
        Order.query.delete()

        # Seed code goes here!
        
        print("Seeding addresses...")
        db.session.add_all(addresses)
        db.session.commit()

        print("Seeding customers...")
        customers = []

        adam = Customer(
        first_name = "Adam",
        last_name = "Moore",
        email = "adam@email.com",
        phone_number = "123-456-7899",
        billing_address_id = 6,
        shipping_address_id = 6
        )
        adam.password_hash = "adam123"
        customers.append(adam)

        bob = Customer(
        first_name = "Bob",
        last_name = "Woods",
        email = "bob@email.com",
        phone_number = "123-456-7899",
        billing_address_id = 7,
        shipping_address_id = 7
        )
        bob.password_hash = "bob123"
        customers.append(bob)

        carl = Customer(
        first_name = "Carl",
        last_name = "Winslow",
        email = "carl@email.com",
        phone_number = "123-456-7899",
        billing_address_id = 8,
        shipping_address_id = 8
        )
        carl.password_hash = "carl123"
        customers.append(carl)

        john = Customer(
        first_name = "John",
        last_name = "Powell",
        email = "john@email.com",
        phone_number = "123-456-7899",
        billing_address_id = 1,
        shipping_address_id = 1
        )
        john.password_hash = "john123"
        customers.append(john)

        nick = Customer(
        first_name = "Nick",
        last_name = "Acosta",
        email = "nick@email.com",
        phone_number = "123-456-7899",
        billing_address_id = 2,
        shipping_address_id = 2
        )
        nick.password_hash = "nick123"
        customers.append(nick)

        sarah = Customer(
        first_name = "Sarah",
        last_name = "Parrish",
        email = "sarah@email.com",
        phone_number = "123-456-7899",
        billing_address_id = 3,
        shipping_address_id = 3
        )
        sarah.password_hash = "sarah123"
        customers.append(sarah)

        britney = Customer(
        first_name = "Britney",
        last_name = "Howe",
        email = "britney@email.com",
        phone_number = "123-456-7899",
        billing_address_id = 4,
        shipping_address_id = 4
        )
        britney.password_hash = "britney123"
        customers.append(britney)

        leila = Customer(
        first_name = "Leila",
        last_name = "Conner",
        email = "leila@email.com",
        phone_number = "123-456-7899",
        billing_address_id = 5,
        shipping_address_id = 5
        )
        leila.password_hash = "leila123"
        customers.append(leila)
        
        db.session.add_all(customers)
        db.session.commit()

        print("Seeding items...")       
        db.session.add_all(item_list)
        db.session.commit()

        print("Seeding orders...")
        orders = create_order()
        db.session.add_all(orders)
        db.session.commit()

        print("Seeding order items...")
        order_items_entries = []
        for order in orders:
            sample_items = sample(range(1,len(item_list)), 4)
            for num in sample_items:
                order_item_row = OrderItem(order_id=order.id, item_id=num, quantity=randint(1, 3))
                order_items_entries.append(order_item_row)


        db.session.add_all(order_items_entries)
        db.session.commit()



        print("Done seeding")


