const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

// creating empty arrays to store values in order to show them back later when a get request is made
const users = [];
const productCategories = [];
const products = [];
const orders = [];

// these are the get routes of the app they'll just return the array as a json object

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/product_categories", (req, res) => {
  res.json(productCategories);
});

app.get("/all_products", (req, res) => {
  res.json(products);
});

app.get("/placed_orders", (req, res) => {
  res.json(orders);
});

// these are the post routes of the app, they push to the array in order to store the data taken from the user
app.post("/registration", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.gender,
      age: req.body.age,
    };
    users.push(newUser);
    res.status(201).json({ message: "Inserted successfully" });
  } catch (err) {
    res.send(err);
  }
});

app.post("/login", async (req, res) => {
  const user = users.find((user) => user.email === req.body.email);
  if (user == null) {
    return res.status(400).json({ message: "Wrong Email Address" });
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.json({ message: `successfully logged in as ${user.name}` });
    } else {
      res.json({ message: ` Wrong Password` });
    }
  } catch {
    res.status(500).send();
  }
});

app.post("/insert_product_category", (req, res) => {
  try {
    const newProductCategory = {
      category_name: req.body.category_name,
      category_description: req.body.category_description,
    };
    productCategories.push(newProductCategory);
    res.status(201).json({ message: "Inserted successfully" });
  } catch (err) {
    res.send(err);
  }
});

app.post("/insert_product", (req, res) => {
  try {
    const newProduct = {
      category_id: req.body.category_id,
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
    };
    products.push(newProduct);

    res.status(201).json({ message: "Inserted successfully" });
  } catch (err) {
    res.send(err);
  }
});

app.post("/place_order", (req, res) => {
  try {
    const newOrder = {
      user_id: req.body.user_id,
      product_id: req.body.product_id,
    };
    orders.push(newOrder);
    res.status(201).json({ message: "Inserted successfully" });
  } catch (err) {
    res.send(err);
  }
});

app.listen(8080, console.log("Server is running on port 8080"));
