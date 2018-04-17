DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45),
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Hoe", "Gardening", 25.00, 50),
	("Hedge Clippers", "Gardening", 10.50, 100), 
	("Rake", "Gardening", 25.00, 50),
	("Trowel", "Gardening", 5.00, 100),
	("Shovel", "Gardening", 25.00, 50),
	("Hammer", "Tools", 20.00, 100),
	("Flat-Head Screwdriver", "Tools", 2.50, 100),
	("Phillips-head Screwdriver", "Tools", 2.75, 100),
	("Pliers", "Tools", 3.00, 100),
	("Wire-Cutters", "Tools", 10.00, 100);

