CREATE DATABASE bamazonDB;

USE bamazondb;

CREATE TABLE products(
	item_id INTEGER NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100),
	price DECIMAL(10, 2) NOT NULL,
	stock_quantity INTEGER NOT NULL,
	PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Hooded Sweatshirt", "Apparel", 29.99, 20),
("Coca Cola- 12 Pack Cans", "Grocery", 5.99, 30),
("Mulan", "Movies", 4.99, 12),
("The Goonies", "Movies", 4.99, 12),
("Motor Oil- 10w30", "Automovie", 7.99, 20),
("Overwatch", "Video Games", 39.99, 40),
("Thrasher Magazine", "Books", 5.99, 40),
("Flashlight", "Outdoors", 14.99, 25);

SELECT * FROM products; 




CREATE DATABASE bamazonDB;

USE bamazondb;

CREATE TABLE products(
	item_id INTEGER NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100),
	price DECIMAL(10, 2) NOT NULL,
	stock_quantity INTEGER NOT NULL,
	PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Motor Oil- 10w30", "Automovie", 7.99, 20),
("Overwatch", "Video Games", 39.99, 40),
("Thrasher Magazine", "Books", 5.99, 40),
("Flashlight", "Outdoors", 14.99, 25);

UPDATE Customers
SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
WHERE CustomerID = 1;

UPDATE products SET stock_quantity= stock_quantity+20 WHERE item_id = 3;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Nail Polish", "Cosmetics", 10.50, 25);

SELECT * FROM products;
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Nail Polish", "Cosmetics", 10.50, 25);

SELECT * FROM products;

SELECT * FROM products WHERE stock_quantity < 20;