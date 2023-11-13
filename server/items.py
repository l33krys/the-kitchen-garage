from models import Item

item_list = []
item1 = Item(
    name="Stand Mixer", 
    image="https://images.pexels.com/photos/1450907/pexels-photo-1450907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
    category="appliances", 
    description="Help make mixing easier", 
    inventory=10, 
    price=200.00
    )
item_list.append(item1)

item3 = Item(
    name="Espresso Machine", 
    image="https://images.pexels.com/photos/10078423/pexels-photo-10078423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
    category="appliances", 
    description="Brew coffee in seconds", 
    inventory=15, 
    price=99.00
    )
item_list.append(item3)

item4 = Item(
    name="Toaster", 
    image="https://images.pexels.com/photos/7936638/pexels-photo-7936638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
    category="appliances", 
    description="Toast two slices of bread at once", 
    inventory=3, 
    price=39.00
    )
item_list.append(item4)

item5 = Item(
    name="Pizza Oven", 
    image="https://images.unsplash.com/photo-1621538997326-08eb4e59886c?auto=format&fit=crop&q=80&w=2449&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    category="appliances", 
    description="Make wood-fired pizza in minutes", 
    inventory=0, 
    price=200.00
    )
item_list.append(item5)

item6 = Item(
    name="Pasta Maker", 
    image="https://images.unsplash.com/photo-1610649332473-39f111cbec15?auto=format&fit=crop&q=80&w=2479&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    category="appliances", 
    description="Make wood-fired pizza in minutes", 
    inventory=10, 
    price=79.99
    )
item_list.append(item6)

item7 = Item(
    name="Plates", 
    image="https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    category="accessories", 
    description="", 
    inventory=10, 
    price=34.99
    )
item_list.append(item7)

item8 = Item(
    name="Pot", 
    image="https://images.unsplash.com/photo-1556911820-1238441ed1a7?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    category="tools", 
    description="", 
    inventory=10, 
    price=49.99
    )
item_list.append(item8)

item9 = Item(
    name="Pour-Over Coffeemaker", 
    image="https://images.unsplash.com/photo-1504627298434-2119d6928e93?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    category="appliances", 
    description="Brew coffee to your desired strength", 
    inventory=10, 
    price=59.99
    )
item_list.append(item9)

item10 = Item(
    name="Dutch Oven", 
    image="https://images.unsplash.com/photo-1556910148-3adb7f0c665a?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    category="tools", 
    description="", 
    inventory=10, 
    price=74.99
    )
item_list.append(item10)

item11 = Item(
    name="Coffee Cup & Saucer", 
    image="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    category="accessories", 
    description="", 
    inventory=10, 
    price=8.99
    )
item_list.append(item11)

item12 = Item(
    name="Jam Jar Cups", 
    image="https://images.unsplash.com/photo-1506802913710-40e2e66339c9?auto=format&fit=crop&q=80&w=2362&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    category="accessories", 
    description="", 
    inventory=10, 
    price=5.50
    )
item_list.append(item12)

item13 = Item(
    name="Tall Glasses", 
    image="https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&q=80&w=2785&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    category="accessories", 
    description="", 
    inventory=10, 
    price=3.99
    )
item_list.append(item13)

item14 = Item(
    name="Ceramic Bowls Set", 
    image="https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    category="accessories", 
    description="", 
    inventory=10, 
    price=24.99
    )
item_list.append(item14)

item15 = Item(
    name="Kitchen Towel Set", 
    image="https://images.unsplash.com/photo-1545042746-ec9e5a59b359?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    category="accessories", 
    description="", 
    inventory=10, 
    price=19.99
    )
item_list.append(item15)

item17 = Item(
    name="Wood Cutting Board", 
    image="https://images.unsplash.com/photo-1582373778856-37fbec5f8529?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    category="tools", 
    description="", 
    inventory=10, 
    price=34.99
    )
item_list.append(item17)

item19 = Item(
    name="iPad Holder", 
    image="https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=2826&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    category="accessories", 
    description="", 
    inventory=10, 
    price=24.99
    )
item_list.append(item19)

item20 = Item(
    name="Airtight Glass Containers", 
    image="https://images.unsplash.com/photo-1565620731358-e8c038abc8d1?auto=format&fit=crop&q=80&w=2836&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    category="accessories", 
    description="", 
    inventory=10, 
    price=19.99
    )
item_list.append(item20)

item18 = Item(
    name="Wooden Spoon Set", 
    image="https://images.unsplash.com/photo-1582828462913-ff94884827ba?auto=format&fit=crop&q=80&w=2786&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    category="tools", 
    description="", 
    inventory=10, 
    price=79.99
    )
item_list.append(item18)

item16 = Item(
    name="Jar Containers", 
    image="https://images.unsplash.com/photo-1559837957-bab8edc53c85?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    category="accessories", 
    description="", 
    inventory=10, 
    price=64.99
    )
item_list.append(item16)

item2 = Item(
    name="Cast-Iron Skillet", 
    image="https://images.unsplash.com/photo-1667980972010-884946d24318?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    category="tools", 
    description="", 
    inventory=10, 
    price=64.99
    )
item_list.append(item2)
