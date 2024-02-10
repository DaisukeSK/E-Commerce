CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE categories(
    category_id SERIAL PRIMARY KEY,
    category_name TEXT NOT NULL
);

CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price INT NOT NULL,
    images TEXT[],
    category_id INT NOT NULL
);

CREATE TABLE favorite(
    favorite_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL
);

CREATE TABLE shopping_cart(
    shopping_cart_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    product_quantity INT NOT NULL
);

CREATE TABLE history(
    history_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    product_quantity INT NOT NULL,
    shopping_date TIMESTAMP NOT NULL
);