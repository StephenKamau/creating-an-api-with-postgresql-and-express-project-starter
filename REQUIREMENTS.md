# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be
able to browse an index of all products, see the specifics of a single product, and add products to an order that they
can view in a cart page. You have been tasked with building the API that will support this application, and your
coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as
well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Products

- Index : `GET /products`
- Show : `GET /products/:id`
- Create [token required] : `POST /products`
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category) : `GET /products/category/:category`

#### Users

- Index [token required] : `GET /users`
- Show [token required] : `GET /users/:id`
- Create N[token required] : `POST /users`

#### Orders

- Current Order by user [args: user id](token required) : `GET /orders/:userid`
- [OPTIONAL] Completed Orders by user [args: user id](token required): `GET /orders/completed/:userId`
- Create order [args: user id, product id](token required): `POST /orders/:userId`
- Add products to order [args: order id](token required): `POST /orders/:orderId/products`

## Data Shapes

### Product

- id
- name
- price
- [OPTIONAL] category

###### Table schema

|  Column  | Data type |            Description            |
|:--------:|:---------:|:---------------------------------:|
|    id    | [INTEGER] | Unique identifier for the product |
|   name   | [VARCHAR] |           Product name            |
|  price   | [INTEGER] |    Unit price for the product     |
| category | [VARCHAR] |         Product category          |

#### User

- id
- firstName
- lastName
- password

###### Table schema

|  Column   | Data type |          Description           |
|:---------:|:---------:|:------------------------------:|
|    id     | [INTEGER] | Unique identifier for the user |
|   email   | [VARCHAR] |           User email           |
| firstname | [VARCHAR] |        User's firstname        |
| lastname  | [VARCHAR] |        User's lastname         |
| password  | [VARCHAR] |     User's hashed password     |

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

###### Table schema

|   Column    | Data type |               Description                |
|:-----------:|:---------:|:----------------------------------------:|
|     id      | [INTEGER] |     Unique identifier for the order      |
|   userid    | [INTEGER] |  Foreign key to link an order to a user  |
| orderstatus | [VARCHAR] | Status of the order (active or complete) |

#### Orders_Products

- id
- orderid of each product in the order
- quantity of each product in the order
- productid
- quantity of order

###### Table schema

|  Column   | Data type |                      Description                      |
|:---------:|:---------:|:-----------------------------------------------------:|
|    id     | [INTEGER] |        Unique identifier for the order product        |
|  orderid  | [INTEGER] |   Foreign key to link an order product to an order    |
| productid | [INTEGER] |   Foreign key to link an order product to products    |
| quantity  | [INTEGER] | Quantity of the individual product linked to an order |
