const users = require("../data/users");
let userIdCounter = 1;

exports.createUser = (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Name is required" });
  }

  const newUser = {
    id: userIdCounter++,
    name: name.trim()
  };

  users.push(newUser);

  res.status(201).json({ message: "User created", user: newUser });
};
