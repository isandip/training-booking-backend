const users = require("../data/users");

// simple counter (in-memory)
let userIdCounter = 1;

// generate unique user reference
function genUserRef() {
  return `USER-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`;
}

exports.createUser = (req, res) => {
  const { name, email } = req.body;

  // validation
  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Name is required" });
  }

  if (!email || email.trim() === "") {
    return res.status(400).json({ message: "Email is required" });
  }

  const newUser = {
    id: userIdCounter++,
    name: name.trim(),
    email: email.trim(),
    userRef: genUserRef(),
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  return res.status(201).json({ message: "User created", user: newUser });
};
