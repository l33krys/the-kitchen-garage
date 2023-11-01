#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc, sample

# Remote library imports
from faker import Faker
fake = Faker()

# Local imports
from app import app
from models import db, Customer, Address, Item, OrderItem, Order

# def create_address():
#     addresses = []
#     for _ in range(10):
#         a = Address(
#             street = fake.street_address(),
#             city = fake.city(),
#             state = fake.state_abbr(),
#             zip_code = fake.postcode()
#         )
#         addresses.append(a)
#     return addresses

# def create_customer():
#     customers = []
#     for _ in range(10):
#         fake_first_name = fake.first_name()
#         fake_last_name = fake.last_name()
#         c = Customer(
#             first_name = fake_first_name,
#             last_name = fake_last_name,
#             email = fake_first_name + "." + fake_last_name + "@email.com",
#             phone_number = "123-456-7899",
#             _password_hash = "Pass1234",
#             billing_address_id = rc(addresses).id,
#             shipping_address_id = rc(addresses).id
#         )
#         c.password_hash = c.first_name + "pass"
#         customers.append(c)
#     return customers

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
        addresses = []

        a1 = Address(
            street = "3017 E Jackson Ave",
            city = "Spokane",
            state = "WA",
            zip_code = "99207"
        )
        addresses.append(a1)

        a2 = Address(
            street = "1200 Lawe St",
            city = "Kaukauna",
            state = "WI",
            zip_code = "54130"
        )
        addresses.append(a2)

        a3 = Address(
            street = "7021 N Mesa Lake Dr",
            city = "Mount Carmel",
            state = "IL",
            zip_code = "62863"
        )
        addresses.append(a3)

        a4 = Address(
            street = "1495 Lower Notch Rd",
            city = "Gross Pointe",
            state = "MI",
            zip_code = "48236"
        )
        addresses.append(a4)

        a5 = Address(
            street = "465 Mattie Ave",
            city = "Sycamore",
            state = "GA",
            zip_code = "31790"
        )
        addresses.append(a5)

        a6 = Address(
            street = "326 E Adams St",
            city = "Bristol",
            state = "CA",
            zip_code = "62644"
        )
        addresses.append(a6)

        a7 = Address(
            street = "123 Beach Ave",
            city = "Irvine",
            state = "CA",
            zip_code = "11692"
        )
        addresses.append(a7)

        a8 = Address(
            street = "219 Stonehaven Dr",
            city = "Red Hill",
            state = "NY",
            zip_code = "65066"
        )
        addresses.append(a8)

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
        email = "britny@email.com",
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
        item1 = Item(name="Stand Mixer", image="https://images.pexels.com/photos/1450907/pexels-photo-1450907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", category="appliances", description="Help make mixing easier.", inventory=10, price=200.00)
        item2 = Item(name="Blender", image="https://images.pexels.com/photos/7460165/pexels-photo-7460165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", category="appliances", description="Create smoothies effortlessly.", inventory=5, price=50.00)
        item3 = Item(name="Single Cup Coffee Machine", image="https://images.pexels.com/photos/10078423/pexels-photo-10078423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", category="appliances", description="Brew coffee in seconds.", inventory=15, price=99.00)
        item4 = Item(name="Toaster", image="https://images.pexels.com/photos/7936638/pexels-photo-7936638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", category="appliances", description="Make chicken wings in no time.", inventory=15, price=39.00)
        # To use file images
        # image="assets/applianceImages/vecteezy_coffe-style-illustration-ai-generated_21946989_918.jpg"
        item_list = [item1, item2, item3, item4]
        
        db.session.add_all(item_list)
        db.session.commit()

        print("Seeding orders...")
        orders = create_order()
        db.session.add_all(orders)
        db.session.commit()

        print("Seeding order items...")
        # order_items = create_order_item()
        # db.session.add_all(order_items)
        # db.session.commit()

        order_items_entries = []
        for order in orders:
            for item in item_list:
                order_item_row = OrderItem(order_id=order.id, item_id=item.id, quantity=1)
                order_items_entries.append(order_item_row)

        db.session.add_all(order_items_entries)
        db.session.commit()



        print("Done seeding")


