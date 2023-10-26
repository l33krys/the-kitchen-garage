from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
import datetime

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

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode("utf-8"))

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
    price = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # Relationships
    order_items = db.relationship("OrderItem", back_populates="items")

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
    items = db.relationship("Item", back_populates="order_items", cascade="all")
    orders = db.relationship("Order", back_populates="order_items")

    def __repr__(self):
        return f"OrderItems {self.id} {self.item} {self.quantity} {self.order_id}"

