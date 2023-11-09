# Phase 5 Project: The Kitchen Garage

## Fake E-Commerce Site

The Kitchen Garage is a fake e-commerce site that provides the user a full shopping experience.

---

## Tecnologies Used

<ul>
  <li>Frontend: React, Semanti UI React, Formik
  <li>Backend: Flask, Flask Marshmallow, SQLAlchemy
  <li>Database: SQLite
  <li>State Management: React Hooks, Redux
  <li>Validation: Yup
</ul>

## Application Setup

Clone the repository: git clone [git@github.com:l33krys/the-kitchen-garage.git]

### Frontend:
<ol>
  <li>In the parent folder of the project directory cd into client folder
  <li>Install dependencies: npm install
  <li>Start the React development server: npm start
</ol>

### Backend:

<ol>
  <li>In the parent folder of the project directory install dependencies: pipenv install
  <li>Start a virtual environment: pipenv shell
  <li>From there cd into the server folder
  <li>Run the following commands:
    <ul>
      <li>export FLASK_APP=app.py
      <li>export FLASK_RUN_PORT=5555
    </ul>
  <li>Seed the data: python seed.py
  <li>Start the server: python app.py
</ol>

---
## Usage


Currently only registered customers can purchase items.

Login or Sign Up
<ul>
  <li>Link to Customer Login/Signup in the upper right-hand corner
  <li>Registered customers can log in while new users can create an account
</ul>

Shop Items
<ul>
  <li>Registered and unregistered customers can view items
  <li>Navigation bar shows 3 categories: Appliances, Tools, Accessories
  <li>Log in to add items to cart
  <li>If not logged in, buttons on the item card will direct customer to login or create account first
  <li>When inventory is low, cards will reveal text that says "Sold out" or "Only # left"
  <li>Items can be sorted by Best Match (item id) and Price as well as a live search
  <li>Items can be added multiple times to cart and will notify user items were added
</ul>

Cart
<ul>
  <li>View cart by clicking on the shopping cart icon in the upper right
  <li>Number of cart items can be seen next to shopping cart
  <li>Customer can see list of items they've added to the cart
  <li>Quantity can be increased or decreased
  <li>If quantity goes to 0, the row will be deleted
  <li>Items can also be deleted from the cart by clicking on the trash can icon
  <li>If there are too many items in the cart, text will appear to notify customer to reduce quantity
</ul>

Checkout
<ul>
  <li>Clicking on "Proceed to Payment" on cart page will start the checkout process
  <li>Inventory will be checked on the backend before moving forward
  <li>If inventory is more than quantity, the customer will be notified to adjust their quantity
  <li>If there's enough inventory, order will be submitted and customer will be transferred to Stripe payment site for payment
  <li>After payment is collected, customer will be sent to a Success page
  <li>If payment is aborted, customer will be sent to a Cancel page and advised to contact customer service for further assistance. The submitted order will be reversed along with quantities so that customer can continue where they left off.
</ul>

Order History
<ul>
  <li>Customer can see a list of past orders
  <li>Clicking on View Details will show full order details
</ul>

---

## Contributing

Contributions are welcome! If you find any issues or want to enhance the application, please create a pull request or submit an issue. 