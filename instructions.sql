------------------------------------------------------------------
-- Instructions de création de la base de données et des tables --
------------------------------------------------------------------
CREATE DATABASE milodie;

CREATE TABLE users
(
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  pass VARCHAR(255) NOT NULL,
  registration_date DATETIME NOT NULL,
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
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
)

CREATE TABLE blogposts
(
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255)
)

---------------------------------------------------------------------
-- Instructions d'alimentation de la base de données et des tables --
---------------------------------------------------------------------

-- table users --
INSERT INTO users 
  (name, email, pass, registration_date, roles) 
  VALUES 
  ('Mat', 'mat@gmail.com', 'mdpTest', NOW(),'admin');

INSERT INTO users 
  (name, email, pass, registration_date) 
  VALUES 
  ('Flo', 'flo@gmail.com', 'mdpFlo', NOW());


-- table products --
INSERT INTO products
  (name, description, image, price, categories)
  VALUES
  ('Boucle 1', 'Une belle paire de boucles', 'image1.jpg', 9.50, ['Boucles']);

INSERT INTO products
  (name, description, image, price, categories)
  VALUES
  ('Boucle 2', 'Une belle paire de boucles', 'image2.jpg', 15.50, ['Boucles']);

INSERT INTO products
  (name, description, image, price, categories)
  VALUES
  ('Boucle 3', 'Une belle paire de boucles', 'image3.jpg', 150.50, ['Boucles']);


-- table carts --
INSERT INTO carts 
  (user_id)
  VALUES
  (1);

INSERT INTO carts 
  (user_id)
  VALUES
  (2);
