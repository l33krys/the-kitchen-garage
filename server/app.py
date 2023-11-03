#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import jsonify
from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from marshmallow import fields

# Local imports
from config import app, db, api, ma, CORS
# Add your model imports
from models import *

# Views go here!
CORS(app)

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
    customer = fields.Nested(CustomerSchema(only=("email",)))
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

class Customers(Resource):

    def get(self):
        customers = Customer.query.all()
        # billings = [customer.billing_address for customer in Customer.query.all()]

        response = make_response(
            customers_schema.dump(customers), 200
        )
        return response
    
    def post(self):

        first_name = request.get_json()["first_name"]
        last_name = request.get_json()["last_name"]
        email = request.get_json()["email"]
        password = request.get_json()["password"]
        
        try:
            customer = Customer(
                first_name=first_name,
                last_name=last_name,
                email=email
            )
            customer.password_hash = password

            db.session.add(customer)
            db.session.commit()
            return make_response(
                customer_schema.dump(customer), 201
            )
        except ValueError:
            return make_response(
                {"errors": ["validation errors"]}, 400
            )

class CustomerById(Resource):

    def get(self, id):
        customer = Customer.query.filter_by(id=id).first()
        if customer:
            return make_response(
                customer_schema.dump(customer), 200
            )
        else:
            return make_response(
                {"error": "Customer does not exist"}, 404
            )
    
    def patch(self, id):
        data = request.get_json()
        customer = Customer.query.filter_by(id=id).first()
        if customer:
            try:
                for key in data:
                    if hasattr(customer, key):
                        setattr(customer, key, data[key])
                    if data.get("password"):
                        password = request.get_json()["password"]
                        if password != "****":
                            customer.password_hash = password
                db.session.commit()

                return make_response(
                    customer_schema.dump(customer), 200
                )
            except ValueError:
                return make_response(
                    {"errors": ["validation errors"]}, 400
                )
        else:
            return make_response(
                {"error": "Customer does not exist"}, 404
            )

    def delete(self, id):
        customer = Customer.query.filter_by(id=id).first()
        if customer:
            db.session.delete(customer)
            db.session.commit()
            return make_response(
                {}, 204
            )
        else:
            return make_response(
                {"error": "Customer does not exist"}, 404
            )


class Addresses(Resource):

    def get(self):
        addresses = Address.query.all()
        response = make_response(
            addresses_schema.dump(addresses), 200
        )
        return response
    
    def post(self):

        data = request.get_json()
        address = Address()
        try:
            for key in data:
                if hasattr(address, key):
                    setattr(address, key, data[key])
            db.session.add(address)
            db.session.commit()
            return make_response(
                address_schema.dump(address), 201
            )
        except ValueError:
            return make_response(
                {"errors": ["validation errors"]}, 400
            )

class AddressById(Resource):

    def get(self, id):
        address = Address.query.filter_by(id=id).first()
        if address:
            return make_response(
                address_schema.dump(address), 200
            )
        else:
            return make_response(
                {"error": "Address does not exist"}, 404
            )
    
    def patch(self, id):
        data = request.get_json()
        address = Address.query.filter_by(id=id).first()
        if address:
            try:
                for key in data:
                    if hasattr(address, key):
                        setattr(address, key, data[key])
                db.session.commit()

                return make_response(
                    address_schema.dump(address), 200
                )
            except ValueError:
                return make_response(
                    {"errors": ["validation errors"]}, 400
                )
        else:
            return make_response(
                {"error": "Address does not exist"}, 404
            )

    def delete(self, id):
        address = Address.query.filter_by(id=id).first()
        if address:
            db.session.delete(address)
            db.session.commit()
            return make_response(
                {}, 204
            )
        else:
            return make_response(
                {"error": "Address does not exist"}, 404
            )


class Items(Resource):

    def get(self):
        items = Item.query.all()
        response = make_response(
            items_schema.dump(items), 200
        )
        return response
    
    def post(self):

        data = request.get_json()
        item = Item()
        try:
            for key in data:
                if hasattr(item, key):
                    setattr(item, key, data[key])
            db.session.add(item)
            db.session.commit()
            return make_response(
                item_schema.dump(item), 201
            )
        except ValueError:
            return make_response(
                {"errors": ["validation errors"]}, 400
            )

class ItemById(Resource):

    def get(self, id):
        item = Item.query.filter_by(id=id).first()
        if item:
            return make_response(
                item_schema.dump(item), 200
            )
        else:
            return make_response(
                {"error": "Item does not exist"}, 404
            )
    
    def patch(self, id):
        data = request.get_json()
        item = Item.query.filter_by(id=id).first()
        if item:
            try:
                for key in data:
                    if hasattr(item, key):
                        setattr(item, key, data[key])
                db.session.commit()

                return make_response(
                    item_schema.dump(item), 200
                )
            except ValueError:
                return make_response(
                    {"errors": ["validation errors"]}, 400
                )
        else:
            return make_response(
                {"error": "Item does not exist"}, 404
            )

    def delete(self, id):
        item = Item.query.filter_by(id=id).first()
        if item:
            db.session.delete(item)
            db.session.commit()
            return make_response(
                {}, 204
            )
        else:
            return make_response(
                {"error": "Item does not exist"}, 404
            )



class Orders(Resource):

    def get(self):
        orders = Order.query.all()
        response = make_response(
            orders_schema.dump(orders), 200
        )
        return response
    
    def post(self):

        status = request.get_json()["status"]
        customer_id = request.get_json()["customer_id"]
        shipping = request.get_json()["shipping"]
        total = request.get_json()["total"]

        try:
            order = Order(
                status=status,
                customer_id=customer_id,
                shipping=shipping,
                total=total
            )
            db.session.add(order)
            db.session.commit()
            return make_response(
                order_schema.dump(order), 201
            )
        except ValueError:
            return make_response(
                {"errors": ["validation errors"]}, 400
            )

class OrderById(Resource):

    def get(self, id):
        order = Order.query.filter_by(id=id).first()
        if order:
            return make_response(
                order_schema.dump(order), 200
            )
        else:
            return make_response(
                {"error": "Order does not exist"}, 404
            )
    
    def patch(self, id):
        data = request.get_json()
        order = Order.query.filter_by(id=id).first()
        if order:
            try:
                for key in data:
                    if hasattr(order, key):
                        setattr(order, key, data[key])
                db.session.commit()

                return make_response(
                    order_schema.dump(order), 200
                )
            except ValueError:
                return make_response(
                    {"errors": ["validation errors"]}, 400
                )
        else:
            return make_response(
                {"error": "Order does not exist"}, 404
            )

    def delete(self, id):
        order = Order.query.filter_by(id=id).first()
        if order:
            db.session.delete(order)
            db.session.commit()
            return make_response(
                {}, 204
            )
        else:
            return make_response(
                {"error": "Order does not exist"}, 404
            )

class OrderItems(Resource):

    def get(self):

        order = Order.query.filter(Order.customer_id == session["customer_id"]).first()
        orderitems = OrderItem.query.filter(OrderItem.order_id == order.id).all()
        
        response = make_response(
            order_items_schema.dump(orderitems), 200
        )
        return response

    def get(self):

        customer_id = session['customer_id']
        saved_order = Order.query.filter(Order.customer_id == customer_id, Order.status == "saved").first()

        if saved_order:
            order_item_exists = OrderItem.query.filter(OrderItem.order_id == saved_order.id, OrderItem.item_id == 1).first()
            if order_item_exists:
                setattr(order_item_exists, "quantity", order_item_exists.quantity + 5)
                db.session.commit()
                response = make_response(
                    order_item_exists.to_dict(only=("quantity", )), 200
                )
                return response
            else:
                return make_response({"message": "order item doesn't exits"})  
    
    def post(self):

        item_id = request.get_json()["item_id"]
        quantity = request.get_json()["quantity"]
        order_id = request.get_json()["order_id"]
        
        try:
            customer_id = session['customer_id']
            saved_order = Order.query.filter(Order.customer_id == customer_id, Order.status == "saved").first()

            if saved_order:
                order_item_exists = OrderItem.query.filter(OrderItem.order_id == saved_order.id, OrderItem.item_id == item_id).first()
                if order_item_exists:
                    setattr(order_item_exists, "quantity", order_item_exists.quantity + 1)
                    db.session.commit()
                    return make_response(
                        {"message": "order item exists and quantities updated"}, 200
                )

                else:
                    order_item = OrderItem(
                            item_id=item_id,
                            quantity=quantity,
                            order_id=saved_order.id
                        )

                    db.session.add(order_item)
                    db.session.commit()

                    return make_response(
                        {"message": "order item was created"}, 200
                    )
                
            else:
                # If no saved order, create new one
                new_order = Order(
                    status="saved",
                    customer_id=customer_id,
                    shipping=4.99,
                    total=4.99
                )
                db.session.add(new_order)
                db.session.commit()

                saved_order = Order.query.filter(Order.customer_id == customer_id, Order.status == "saved").first()
                order_item = OrderItem(
                    item_id=item_id,
                    quantity=quantity,
                    order_id=saved_order.id
                )

                db.session.add(order_item)
                db.session.commit()
                return make_response(
                    customer_schema.dump(order_item), 201
                )
            
        except ValueError:
            return make_response(
                {"errors": ["validation errors"]}, 400
            )

class OrderItemById(Resource):

    def get(self, id):
        order_item = OrderItem.query.filter_by(id=id).first()
        if order_item:
            return make_response(
                order_item_schema.dump(order_item), 200
            )
        else:
            return make_response(
                {"error": "Order Item does not exist"}, 404
            )
    
    def patch(self, id):
        data = request.get_json()
        order_item = OrderItem.query.filter_by(id=id).first()
        if order_item:
            try:
                for key in data:
                    if hasattr(order_item, key):
                        setattr(order_item, key, data[key])
                db.session.commit()

                return make_response(
                    order_item_schema.dump(order_item), 200
                )
            except ValueError:
                return make_response(
                    {"errors": ["validation errors"]}, 400
                )
        else:
            return make_response(
                {"error": "Order Item does not exist"}, 404
            )

    def delete(self, id):
        order_item = OrderItem.query.filter_by(id=id).first()
        if order_item:
            db.session.delete(order_item)
            db.session.commit()
            return make_response(
                {}, 204
            )
        else:
            return make_response(
                {"error": "Order Item does not exist"}, 404
            )
        
class CheckSession(Resource):
    def get(self):

        customer_id = session['customer_id']
        if customer_id:
            customer = Customer.query.filter(Customer.id == customer_id).first()
            return make_response(
                customer_schema.dump(customer), 200
            )
        return {}, 401

class Login(Resource):
    def post(self):
        
        email = request.get_json()['email']
        password = request.get_json()['password']
        customer = Customer.query.filter(Customer.email == email).first()    

        if customer:

            if customer.authenticate(password):
                session["customer_id"] = customer.id
                # return customer.to_dict(), 200

                customer_id = session['customer_id']
                saved_order = Order.query.filter(Order.customer_id == customer_id, Order.status == "saved").first()
                # If no saved order, create new one
                if not saved_order:
                    new_order = Order(
                        status="saved",
                        customer_id=customer_id,
                        shipping=4.99,
                        total=4.99
                    )
                    db.session.add(new_order)
                    db.session.commit()

                res = make_response(customer_schema.dump(customer), 200)
                res.headers['Access-Control-Allow-Origin'] = "http://localhost:3000"
                return res
           
        return {"error": "401 Unauthorized"}, 401    

class Logout(Resource):
    def delete(self):
        
        session["customer_id"] = None
        return {}, 204


api.add_resource(Customers, "/customers", endpoint="customer_list")
api.add_resource(CustomerById, "/customers/<int:id>", endpoint="customer")
api.add_resource(Addresses, "/addresses", endpoint="address_list")
api.add_resource(AddressById, "/addresses/<int:id>", endpoint="address")
api.add_resource(Items, "/items", endpoint="item_list")
api.add_resource(ItemById, "/items/<int:id>", endpoint="item")
api.add_resource(Orders, "/orders", endpoint="order_list")
api.add_resource(OrderById, "/orders/<int:id>", endpoint="order")
api.add_resource(OrderItems, "/order_items", endpoint="order_items_list")
api.add_resource(OrderItemById, "/order_items/<int:id>", endpoint="order_item")
api.add_resource(CheckSession, "/check_session", endpoint="check_session")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")


class OrderItemsbyOrder(Resource):

    def get(self):
        customer_id = session['customer_id']
        if customer_id:
            saved_order = Order.query.filter(Order.customer_id == customer_id, Order.
            status == "saved").first()
            if saved_order:
                order_items = OrderItem.query.filter(OrderItem.order_id == saved_order.id).all()
                return make_response(
                    order_items_schema.dump(order_items), 200
                    # saved_order.to_dict(only=("customer_id", "id"))
                    # {"order id" : saved_order.id}
                )
        else:
            # If no saved order, create new one
            new_order = Order(
                status="saved",
                customer_id=customer_id,
                shipping=4.99,
                total=4.99
            )
            db.session.add(new_order)
            db.session.commit()
            return make_response({}, 201)

        return {}, 401

api.add_resource(OrderItemsbyOrder, "/order_items_by_order")

class OrderHistoryDetails(Resource):

    def get(self):
       
        customer_id = session['customer_id']
        if customer_id:
            order_ids = [order.id for order in Order.query.filter(Order.customer_id == customer_id).all()]
            line_items = []
            for order_num in order_ids:
                line_item = [row.to_dict(only=("orders.customer.id", "orders.updated_at", "orders.status", "order_id", "quantity", "items.name", "items.price",)) for row in OrderItem.query.filter(OrderItem.order_id == order_num).all()]
                line_items.append(line_item)
            return line_items

        return make_response(
            line_items, 200

        )
        return {}, 401

api.add_resource(OrderHistoryDetails, "/order_history_details")

class SubmitOrder(Resource):

    # customer_id = session['customer_id'] # Get logged in customer
    # saved_order = Order.query.filter(Order.customer_id == customer_id, Order.status == "saved").first() # Check if they have an order started
    # check_inventory = Item.query.filter(Item.id == item_id).first() # Get inventory for item
    # in_stock = check_inventory.inventory > quantity # returns boolean value, doesn't need to be serialized # Check if quantity is lower than inventory

    def get(self):
        customer_id = session['customer_id']
        if customer_id:
            saved_order = Order.query.filter(Order.customer_id == customer_id, Order.status == "saved").first()

            # Update inventory

            if saved_order:
                order_items = [row.to_dict(only=("quantity", "item_id",)) for row in OrderItem.query.filter(OrderItem.order_id == saved_order.id).all()]

                check_inventory_list = []
                for product in order_items:
                    check_inventory = Item.query.filter(Item.id == product["item_id"]).first() 
                    check_inventory_list.append(product["quantity"] <= check_inventory.inventory)
                # return check_inventory_list

                all_in_stock = any(check_inventory_list) # Return list of booleans if in stock

                # return make_response(
                #     {"all in stock": str(all_in_stock)}, 200
                # )

                if all_in_stock:
                    for product in order_items:
                        get_item = Item.query.filter(Item.id == product["item_id"]).first() 
                        updated_inventory = get_item.inventory - product["quantity"]
                        setattr(get_item, "inventory", updated_inventory)


                    setattr(saved_order, "status", "submitted") # Change order status to submitted
                    db.session.commit()
            
                    # Create new blank order
                    new_order = Order(
                        status="saved",
                        customer_id=customer_id,
                        shipping=4.99,
                        total=4.99
                    )
                    db.session.add(new_order)
                    db.session.commit()

                    return make_response(order_schema.dump(saved_order), 203)
        
        return make_response(
            {"error": "There are no orders assigned to this customer"}, 400
        )

api.add_resource(SubmitOrder, "/submit_order")

class OrderHistory(Resource):

    def get(self):
        customer_id = session['customer_id']
        # Submitted orders only
        customer_orders = [order.to_dict(only=("id", "status", "updated_at")) for order in Order.query.filter(Order.customer_id == customer_id, Order.status == "submitted").all()]

        return make_response(
            customer_orders, 200
        )

api.add_resource(OrderHistory, "/order_history")

class CheckInventory(Resource):

    def get(self):

        inventory = Item.query.filter(Item.id == 1).first()

        return make_response(
            inventory.to_dict(only=("name", "inventory",)), 200
        )

api.add_resource(CheckInventory, "/check_inventory")

# class ClearCart(Resource):

#     def get(self):
#         customer_id = session['customer_id']
#         if customer_id:
#             saved_order = Order.query.filter(Order.customer_id == customer_id, Order.status == "saved").first()
            
#             db.session.delete(saved_order)
#             db.session.commit()

#             # Create new blank order
#             new_order = Order(
#                 status="saved",
#                 customer_id=customer_id,
#                 shipping=4.99,
#                 total=4.99
#             )
#             db.session.add(new_order)
#             db.session.commit()
#             return make_response(
#                 {}, 201
#             )
#         else:
#             return make_response(
#                 {"error": "Order does not exist"}, 404
#             )

# api.add_resource(ClearCart, "/clear_order")


@app.route('/')
def index():
    return '<h1>The Kitchen Garage</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)


# For later use:
# customer_id = session['customer_id'] # Get logged in customer
# saved_order = Order.query.filter(Order.customer_id == customer_id, Order.status == "saved").first() # Check if they have an order started
# check_inventory = Item.query.filter(Item.id == item_id).first() # Get inventory for item
# in_stock = check_inventory.inventory > quantity # returns boolean value, doesn't need to be serialized # Check if quantity is lower than inventory

