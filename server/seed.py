#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
fake = Faker()

# Local imports
from app import app
from models import db, Customer, Address, Item, OrderItem, Order

def create_address():
    addresses = []
    for _ in range(10):
        a = Address(
            street = fake.street_address(),
            city = fake.city(),
            state = fake.state(),
            zip_code = fake.postcode()
        )
        addresses.append(a)
    return addresses

def create_customer():
    customers = []
    for _ in range(10):
        fake_first_name = fake.first_name()
        fake_last_name = fake.last_name()
        c = Customer(
            first_name = fake_first_name,
            last_name = fake_last_name,
            email = fake_first_name + "." + fake_last_name + "@email.com",
            phone_number = fake.phone_number(),
            _password_hash = "Pass1234",
            billing_address_id = rc(addresses).id,
            shipping_address_id = rc(addresses).id
        )
        customers.append(c)
    return customers

def create_order():
    orders = []
    for _ in range(5):
        shipping_cost = 4.99
        o = Order(
            status = "draft",
            customer_id = rc(customers).id,
            shipping = shipping_cost,
            total = shipping_cost
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

# def add_to_order():
    


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
        addresses = create_address()
        db.session.add_all(addresses)
        db.session.commit()

        print("Seeding customers...")
        customers = create_customer()
        db.session.add_all(customers)
        db.session.commit()

        print("Seeding items...")
        item1 = Item(name="Stand Mixer", category="appliance", description="Help make mixing easier.", inventory=10, price=200)
        item2 = Item(name="Blender", category="appliance", description="Create smoothies effortlessly.", inventory=5, price=50)
        item3 = Item(name="Single Cup Coffee Machine", category="appliance", description="Brew coffee in seconds.", inventory=15, price=99)
        item4 = Item(name="Air Fryer", category="appliance", description="Make chicken wings in no time.", inventory=15, price=149)

        item_list = [item1, item2, item3, item4]
        
        db.session.add_all(item_list)
        db.session.commit()

        print("Seeding orders...")
        orders = create_order()
        db.session.add_all(orders)
        db.session.commit()

        print("Seeding order items...")
        order_items = create_order_item()
        db.session.add_all(order_items)
        db.session.commit()



        print("Done seeding")
