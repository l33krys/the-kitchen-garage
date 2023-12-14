from marshmallow import fields

# Local imports
from config import app, db, api, ma, CORS
# Add your model imports
from models import *

class AddressSchema(ma.SQLAlchemySchema):

    class Meta:
        model = Address
        load_instance = True

    id = ma.auto_field()
    street = ma.auto_field()
    city = ma.auto_field()
    state = ma.auto_field()
    zip_code = ma.auto_field()

address_schema = AddressSchema()
addresses_schema = AddressSchema(many=True)

class CustomerSchema(ma.SQLAlchemySchema):

    class Meta:
        model = Customer
        load_instance = True

    id = ma.auto_field()
    first_name = ma.auto_field()
    last_name = ma.auto_field()
    email = ma.auto_field()
    phone_number = ma.auto_field()
    billing_address = fields.Nested(AddressSchema)
    shipping_address = fields.Nested(AddressSchema)

customer_schema = CustomerSchema()
customers_schema = CustomerSchema(many=True)

class ItemSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Item
        load_instance = True

    id = ma.auto_field()
    name = ma.auto_field()
    image = ma.auto_field()
    category = ma.auto_field()
    description = ma.auto_field()
    inventory = ma.auto_field()
    price = ma.auto_field()

item_schema = ItemSchema()
items_schema = ItemSchema(many=True)

class OrderSchema(ma.SQLAlchemySchema):

    class Meta:
        model = Order
        load_instance = True

    id = ma.auto_field()
    status = ma.auto_field()
    customer_id = ma.auto_field()
    customer = fields.Nested(CustomerSchema(only=("email", "shipping_address")))
    shipping = ma.auto_field()
    # total = ma.auto_field()

order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)

class OrderItemSchema(ma.SQLAlchemySchema):

    class Meta:
        model = OrderItem
        load_instance = True

    id = ma.auto_field()
    items = fields.Nested(ItemSchema)
    quantity = ma.auto_field()
    orders = fields.Nested(OrderSchema)

order_item_schema = OrderItemSchema()
order_items_schema = OrderItemSchema(many=True)
