# Sci-commerce

[Sci-commerce](sci-commerce.herokuapp.com) is a **mock** commerce site written with the PERN (Postgresql, Express.js, React, Node.js) Typescript/Javascript stack and hosted by Heroku. It also uses AWS S3 for image storage.

## Front-end

The front-end is written in React Typescript. Every thing is stored within the `/Client` folder, and all components are stored within the `/src/components` folder. Hooks are handled with Redux ToolKit and HTTP requests are sent with Axios.

## Back-end

The server is written in Node.js with Express.js middleware and connects to a Postgresql database, all hosted in Heroku.

![sci-commercec entity relational diagrams](https://sci-commerce.s3.us-east-2.amazonaws.com/ERD.jpeg)

The database is made of 6 tables:

- The standard users and products table.
- A categories table to easily manage of future changes of categories (connected to products table as a foreign key).
- A carts and favorites table to better manage and analyze data (both connected to users and products by foreign keys).
- A purchases(order history) table to anaylze purchase data (when a purchase tuple is created, it stores all the user's cart data into a list of objects, and connects to the user via foreign key).
