-- Instructions de création de la base de données et des tables --
CREATE DATABASE milodie;

CREATE TABLE users
(
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  pass VARCHAR(255) NOT NULL,
  registrationDate DATETIME NOT NULL,
  roles SET('customer', 'admin', 'superadmin')
);

CREATE TABLE products
(
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255) NOT NULL,
  discount DECIMAL(10, 2),
  price DECIMAL(10, 2) NOT NULL
)

CREATE TABLE commands 
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  commandDate DATETIME NOT NULL,
  shippingDate DATETIME,
  customerName VARCHAR(255) NOT NULL,
  customer_id INT NOT NULL,
  product_id INT NOT NULL,
  commandStatus VARCHAR(255) NOT NULL,
  shippingNumber VARCHAR(255),
  discount DECIMAL(10, 2),
  totalPrice DECIMAL(10, 2) NOT NULL
)

CREATE TABLE carts 
(
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  product_id INT,
  user_id INT NOT NULL,
  image VARCHAR(255),
  discount DECIMAL(10, 2),
  totalPrice DECIMAL(10, 2) default 0
)

CREATE TABLE blogposts
(
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255)
)