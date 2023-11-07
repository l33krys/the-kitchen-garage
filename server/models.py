from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
import datetime
import re

from config import db, bcrypt

# Models go here!
class Customer(db.Model, SerializerMixin):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String)
    phone_number = db.Column(db.String)
    _password_hash = db.Column(db.String)
    billing_address_id = db.Column(db.Integer, db.ForeignKey("addresses.id"))
    shipping_address_id = db.Column(db.Integer, db.ForeignKey("addresses.id"))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # Relationships
    billing_address = db.relationship("Address", foreign_keys=[billing_address_id])
    shipping_address = db.relationship("Address", foreign_keys=[shipping_address_id])
    orders = db.relationship("Order", back_populates="customer", cascade="all")

    # Validations
    @validates("first_name")
    def validate_first_name(self, key, first_name):
        if not first_name:
            raise ValueError("First name is required")
        if not 1 <= len(first_name) <= 15:
            raise ValueError("First name must be between 1 and 15 characters")
        return first_name
    
    @validates("last_name")
    def validate_first_name(self, key, last_name):
        if not last_name:
            raise ValueError("Last name is required")
        if not 1 <= len(last_name) <= 15:
            raise ValueError("Last name must be between 1 and 15 characters")
        return last_name
    
    @validates("email")
    def validate_email(self, key, email):
        if not email:
            raise ValueError("Email address is required")
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        if not re.match(email_regex, email):
            raise ValueError("Invalid email address format")
        if len(email) > 40:
            raise ValueError("Email address must be between 1 and 40 characters")
        return email

    @validates("phone_number")
    def validate_phone_number(self, key, phone_number):
        phone_regex = r'^\d{3}-\d{3}-\d{4}$'
        if not re.match(phone_regex, phone_number):
            raise ValueError("Invalid phone number format. Please use XXX-XXX-XXXX format.")
        return phone_number
    
    @validates("billing_address_id", "shipping_address_id")
    def validate_address(self, key, id):
        address_ids = [address.id for address in Address.query.all()]
        if (key == "billing_address_id"):
            if id not in address_ids:
                raise ValueError("Address must be created before assigning to customer")
        elif (key == "shipping_address_id"):
            if id not in address_ids:
                raise ValueError("Address must be created before assigning to customer")
        return id

    # @validates("_password_hash")
    # def validate__password_hash(self, key, password):
    #     if not pw and len(password) != 8:
    #         raise ValueError("Password must be 8 characters long")
    #     elif not re.search("[a-z]", password) or re.search("[A-Z]", pw) :
    #         raise ValueError("Password must contain a letter")
    #     elif not re.search("[0-9]", password):
    #         raise ValueError("Password must contain a number")
    #     return pw

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f"Customer {self.id}, {self.first_name} {self.last_name}"

class Address(db.Model, SerializerMixin):
    __tablename__ = "addresses"

    id = db.Column(db.Integer, primary_key=True)
    street = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    zip_code = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # Relationships
    # customer = db.relationship("Customer", foreign_keys=[Customer.billing_address_id, Customer.shipping_address_id], back_populates="addresses")
    orders = association_proxy("customer", "orders")

    # Validations
    @validates("street")
    def validate_street(self, key, street):
        if not street:
            raise ValueError("Street is required")
        elif not len(street) > 1:
            raise ValueError("Street is required")
        return street
    
    @validates("city")
    def validate_city(self, key, city):
        if not city:
            raise ValueError("City is required")
        elif not len(city) > 1:
            raise ValueError("City is required")
        return city
    
    @validates("state")
    def validate_state(self, key, state):
        if not state:
            raise ValueError("State is required")
        if not len(state) > 1:
            raise ValueError("State is required")
        return state

    @validates("zip_code")
    def validate_zip_code(self, key, zip_code):
        if not zip_code:
            raise ValueError("Zip code is required")
        elif not len(zip_code) > 1:
            raise ValueError("Zip code is required")
        return zip_code

    def __repr__(self):
        return f"Address {self.id}, {self.street}, {self.city}, {self.state}, {self.zip_code}"

class Item(db.Model, SerializerMixin):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    category = db.Column(db.String)
    description = db.Column(db.String)
    inventory = db.Column(db.Integer)
    price = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # Relationships
    order_items = db.relationship("OrderItem", back_populates="items")

    # Validations
    @validates("name")
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Item name is required")
        if not 1 <= len(name) <= 15:
            raise ValueError("Item name must be between 1 and 15 characters")
        return name

    @validates("category")
    def validate_name(self, key, category):
        categories = ["appliances", "tools", "accessories"]
        if not category:
            raise ValueError("Category is required")
        elif category not in categories:
            raise ValueError("Category must be either appliances, tools, or accessories")
        return category
    
    @validates("inventory")
    def validate_inventory(self, key, inventory):
        # if not inventory:
        #     raise ValueError("Inventory is required")
        # # elif not isinstance(inventory, int):
        # #     raise ValueError("Inventory must be a number")
        if inventory < 0:
            raise ValueError("Inventory must be a positive integer")
        return inventory
    
    @validates("price")
    def validate_price(self, key, price):
        if not price:
            raise ValueError("Price is required")
        elif not isinstance(price, float):
            raise ValueError("Price must be a number")
        elif price <= 0:
            raise ValueError("Price must be a positive number")
        return price

    def __repr__(self):
        return f"Item {self.id}, {self.name}, {self.category}, {self.inventory}, {self.price}"

class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String)
    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"))
    shipping = db.Column(db.Integer)
    total = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # Relationships
    customer = db.relationship("Customer", back_populates="orders", cascade="all")
    order_items = db.relationship("OrderItem", back_populates="orders", cascade="all")

    # Validations
    @validates("status")
    def validate_name(self, key, status):
        statuses = ["saved", "submitted"]
        if not status:
            raise ValueError("Status is required")
        elif status not in statuses:
            raise ValueError("Status must be either saved or submitted")
        return status

    @validates("customer_id")
    def validate_customer_id(self, key, customer_id):
        if not customer_id:
            raise ValueError("Customer Id or session Id is required")
        return customer_id
    
    @validates("shipping")
    def validate_shipping(self, key, shipping):
        if shipping < 0:
            raise ValueError("Shipping must be $0 or greater")
        elif not isinstance(shipping, float):
            raise ValueError("Shipping must be a number")
        return shipping
    
    @validates("total")
    def validate_total(self, key, total):
        if total < 0:
            raise ValueError("Total must be $0 or greater")
        elif not isinstance(total, float):
            raise ValueError("Total must be a number")
        return total
    
    def __repr__(self):
        return f"Order {self.id} {self.status}"
    
class OrderItem(db.Model, SerializerMixin):
    __tablename__ = "order_items"

    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey("items.id"))
    quantity = db.Column(db.Integer)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # Relationships
    items = db.relationship("Item", back_populates="order_items")
    orders = db.relationship("Order", back_populates="order_items")

    # Validations
    @validates("item_id")
    def validate(self, key, item_id):
        item_ids = [item.id for item in Item.query.all()]
        if not item_id:
            raise ValueError("Item id is required")
        elif item_id not in item_ids:
            raise ValueError("Item must exist")
        return item_id

    @validates("quantity")
    def validate_quantity(self, key, quantity):
        if not quantity:
            raise ValueError("Quantity is required")
        elif not isinstance(quantity, int):
            raise ValueError("Quantity must be a number")
        elif quantity < 0:
            raise ValueError("Quantity must be greater than 0")
        return quantity

    @validates("order_id")
    def validate(self, key, order_id):
        order_ids = [order.id for order in Order.query.all()]
        if not order_id:
            raise ValueError("Order id is required")
        elif order_id not in order_ids:
            raise ValueError("Order must be created before adding items")
        return order_id


    def __repr__(self):
        return f"OrderItems {self.id} {self.item} {self.quantity} {self.order_id}"

